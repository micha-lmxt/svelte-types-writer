import { processFiles } from "./processFiles";


const args = process.argv.splice(2);
const files : string[] = [];
const libs : string[] = [];
let lib = false;
let outfolder = "none";
for (let v of args){
    
    if (v==="--libs"){
        lib = true;
        continue;
    }
    if (v==="--out"){
        outfolder="will get";
        continue;
    }
    if (outfolder==="will get"){
        outfolder = v;
        continue;
    }
    if (lib){
        libs.push(v);
    }else{
        files.push(v);
    }
}

processFiles(files,libs,outfolder);


