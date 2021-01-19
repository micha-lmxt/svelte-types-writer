import { processFiles } from "./processFiles";


const args = process.argv.splice(2);
if (args.length===0){
    console.log(`

        Usage: svelte-types-writer [options] files1 [files2...] [---libs libfiles1 [libfiles2...]]

        where
         - files1, files2... are filenames or globs (eg. ./src/**/*.svelte) for that declaration files should be generated
         - libfiles1, libfiles2... are filenames or globs of files that the transpiler should know to infer types, but no declaration file should be generated for these
         - options: 
            --no-js: set to not generate forwarding javascript files, see README.md,section "Typing Strategy".
            --out <folder>: Set an output folder for the type declarations.
            --override: if existing types and js files should be overridden.
            --debug: for debugging only.
            
    `)
}else{
    const files : string[] = [];
    const libs : string[] = [];
    let lib = false;
    let outfolder = "none";
    let debug=false;
    let nojs = false;
    let override =false;
    for (let v of args){
        
        if (v==="--debug"){
            debug=true;
        }
        if (v==="--libs"){
            lib = true;
            continue;
        }
        if (v==="--no-js"){
            nojs=true;
        }

        if (v==="--out"){
            outfolder="will get";
            continue;
        }
        if (outfolder==="will get"){
            outfolder = v;
            continue;
        }
        if (v==="--override"){
            override=true;
        }
        if (lib){
            libs.push(v);
        }else{
            files.push(v);
        }
    }

    if (outfolder === "will get"){
        outfolder = "none";
    }
    processFiles(files,libs,outfolder,debug,nojs,override);

}
