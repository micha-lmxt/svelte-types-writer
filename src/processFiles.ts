import svelte2tsx from "svelte2tsx";
import fs from 'fs-extra';
import { spawn } from "child_process";
import path from 'path';
import { glob } from "glob";

const readFiles = (files: string[], workdir: string) => {

    const currpath = path.resolve("./");
    const res: { text: string, name: string, dir: string, svelte:boolean }[] = [];
    for (let file of files) {
        const foundFiles = glob.sync(file);
        if (foundFiles.length === 0) {
            console.log("found no files under: " + file);
        }
        for (let foundfile of foundFiles) {
            try {
                const text = fs.readFileSync(foundfile, { encoding: "utf-8" });

                const name = path.basename(foundfile, path.extname(foundfile));
                const dir = path.relative(currpath, path.dirname(foundfile));
                if (!dir.startsWith("..")) {
                    // files outside the root are put to root
                    const targetpath = path.join(workdir, dir)
                    if (!fs.existsSync(targetpath)) {
                        fs.mkdirSync(targetpath, { recursive: true });
                    };

                }

                res.push({ text, name, dir, svelte:path.extname(foundfile).toLowerCase() === ".svelte" });
            }
            catch (e) {
                console.log("Could not process " + foundfile);
                console.log(e);
            }
        }
    }
    return res;
}

export const processFiles = (files: string[], libs: string[], outfolder: string) => {

    if (files.length === 0) {
        return "no files";
    }
    // write received tsx file and extra type declarations
    const workdir = fs.mkdtempSync("./");

    const f = readFiles(files, workdir);
    const texts = processText(f, libs, workdir);
    if (outfolder!=="none"){
        if (!fs.existsSync(outfolder)){
            fs.mkdirSync(outfolder,{recursive:true})
        }
    }

    const currpath = path.resolve("./");
    texts.then(v => {
        v.forEach(w => {
            if (outfolder === "none"){
                console.log("Write file: " + w.name);
                fs.writeFileSync(w.name, w.text);
            }else{
                const full = path.relative(currpath, w.name);
                const file = path.join(outfolder,full)
                const dir = path.dirname(file);
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                console.log("Write file: " + file);
                fs.writeFileSync(file, w.text);
            }


        })
    })
}
export const processText = (files: { text: string, name: string, dir: string, svelte:boolean }[], libs: string[], workdir: string) => {

    // process the .svelte file with svelte2tsx, but only if they have .svelte extension
    const tsx = files.map(v => {
        if (!v.svelte){
            return Object.assign({svelte:false},v);
        }
        return {
            text: svelte2tsx(v.text, {
                filename: v.name, strictMode: true, isTsFile: true
            }).code, name: v.name, dir: v.dir,svelte:true
        }
    }
    );



    const filenames = tsx.map(v => {
        let filename = path.join(workdir, v.dir, v.name);
        if (v.dir.startsWith("..")) {
            filename = path.join(workdir, v.name);
        }
        
        fs.writeFileSync(filename + ".tsx", v.svelte ? preprocessTsx(v.text, v.name) : v.text);
        
        
        return { filename, from: path.join(v.dir, v.name) };
    });

    const currpath = path.resolve("./");
    libs.forEach(v => {

        const foundFiles = glob.sync(v);

        for (let file of foundFiles) {
            const dir = path.relative(currpath, path.dirname(file));
            if (!dir.startsWith("..")) {
                // files outside the root are put to root
                const targetpath = path.join(workdir, dir);
                const name = path.basename(file);
                if (!fs.existsSync(targetpath)) {
                    fs.mkdirSync(targetpath, { recursive: true });
                };
                fs.copyFileSync(file, path.join(targetpath, name));
            }
        }
    });

    // compile tsx file with tsc but only further process declaration file
    const ret = new Promise<{ text: string, name: string }[]>((resolve, reject) => {
        let shims = "./node_modules/svelte2tsx/svelte-shims.d.ts";
        if (!fs.existsSync(shims)){
            shims = "./node_modules/svelte-type-writer/node_modules/svelte2tsx/svelte-shims.d.ts";
        }
        const tscOptions = ["--emitDeclarationOnly", "--declaration"]
            .concat(filenames.map(v => v.filename + ".tsx"))
            //.concat(["extratypes.d.ts"])
            .concat(libs.map(v => path.join(workdir, v)))
            .concat([shims]);
        console.log(tscOptions);
        const sp = spawn("tsc", tscOptions, { cwd: "./" });

        const cont = () => {

            const res: { text: string, name: string }[] = [];


            for (let file of filenames) {
                const dtsfile = file.filename + ".d.ts";
                if (!fs.existsSync(dtsfile)) {
                    console.log(dtsfile + ": d.ts file not found");
                }
                try {

                    // read in newly created d.ts file
                    const types = fs.readFileSync(dtsfile, { encoding: "utf-8" });

                    // restructure file
                    const adjtypes = processDTS(types);

                    // clean up

                    res.push({ text: adjtypes, name: file.from + ".d.ts" });
                }
                catch (e) {
                    console.log(e);
                }
            }

            fs.removeSync(workdir);
            resolve(res);

        }
        sp.on("close", cont);
    });
    return ret;
}
const extratypes = `
declare class SvelteTypedComponent<P,E,S>{
    constructor(options:{
        target:Element,
        props:P
    })
}
`;

const processDTS = (file: string) => {

    
    if (file.includes("SvelteAllProps")){
        const s = file.split("}");
        return s[0] + ", SvelteAllProps }" + s.slice(1).join("}");
    }
    return file;
    /*
    const s = file.split("__SvelteComponent_");
    const name = s[0].replace("declare const ", "");
    const propsEvtsSlot = s[1].replace("_base: {", "").split("} & {");
    const props = propsEvtsSlot[0].split("svelte_type_writer_props:");
    const events = propsEvtsSlot[1].split("svelte_type_writer_events:")[1];
    const slotsExps = propsEvtsSlot[2].split("export");
    const expor = slotsExps[1];
    const slots0 = slotsExps[0].trim().replace("svelte_type_writer_slots:", "").split("};");
    const slots = slots0.slice(0, slots0.length - 1).join("};");
    const remSemAtEnd = (a: string) => {
        const b = a.split("};");
        return b.slice(0, b.length - 1).join("};") + "}" + b[b.length - 1];

    }

    const inner = "import {SvelteComponent} from 'svelte';\n" +
        "interface " + name + "Props" + props[0].replace("\n", "").trim() +
        remSemAtEnd(props[1].replace(/\n    /g, "\n")) + "\n" +
        "interface " + name + "Events" + remSemAtEnd(events) + "\n" +
        "interface " + name + "Slots" + remSemAtEnd(slots) +
        "\n\nexport" + expor + " extends SvelteComponent {\n" +
        "    constructor(options:{\n" +
        "        target: Element;\n" +
        "        anchor?: Element;\n" +
        "        props:" + name + "Props;\n" +
        "        hydrate?: boolean;\n" +
        "        intro?: boolean;\n" +
        "        $$inline?: boolean;\n" +
        "    })\n" +
        "    \n" +
        "    $on<K extends keyof " + name + "Events>(event: K, handler: (e: " + name + "Events[K]) => any): ()=>void;\n" +
        "    $set(props: Partial<" + name + "Props>): void;\n\n" +
        "    $$prop_def: " + name + "Props;\n" +
        "    $$events_def: " + name + "Events;\n" +
        "    $$slot_def: " + name + "Slots;\n" +
        "}";
    return 'declare module "' + name + '.svelte" {\n' +
        inner.replace(/\n/g, "\n    ") +
        "\n}\n"

*/


}


const preprocessTsx = (text: string, name: string) => {
    const a = text.split("export default class");
    const b = a[1].split("createSvelte2TsxComponent");
    const c1 = b[1].split("{");
    const c = c1.slice(0, c1.length - 1).join("{");
    const main = a[0] +
    "export default class " + name + " extends SvelteTypedComponent<" + name + "Props," + name + "Events," + name + "Slots>{}" +
    "const r = " + c + "();\n" +
    "const _" + name + "Props = r.props;\n" +
    "const _" + name + "Events = r.events;\n" +
    "const _" + name + "Slots = r.slots;\n" +
    "export type " + name + "Props = typeof _" + name + "Props;\n" +
    "export type " + name + "Events = typeof _" + name + "Events;\n" +
    "export type " + name + "Slots = typeof _" + name + "Slots;\n";
    return "import {SvelteTypedComponent} from 'svelte-typed-component'\n" + main;

}