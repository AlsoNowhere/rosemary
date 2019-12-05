
const fileReader = require("fs");

if (process.argv[2] === undefined) {
    throw("You must pass a name for the module");
}
if (process.argv[3] === undefined) {
    throw("You must pass a path for the page");
}

const moduleName = process.argv[2];
const path = process.argv[3];
const routePath = process.argv[4];

const newFile = `import React, { useState, useEffect } from "react";

import { _store } from "./_store.store";

export const ${moduleName} = () => {

    const updater = useState()[1];

    useEffect(()=>{
        _store.updater = updater;
        return () => {
            _store.updater = null;
        };
    },[updater]);

    return (
        <section>
            <h2>${moduleName}</h2>
        </section>
    );
}
`;

const findApp = location => {
    if (fileReader.existsSync(location + "/" + "App.js")) {
        return location;
    }
    const dirs = fileReader.readdirSync(location).filter(x=>!x.includes("."));
    let found = null;
    for (let i = 0 ; i < dirs.length ; i++) {
        if (found !== null || dirs[i] === "src") {
            break;
        }
        found = findApp(location + "/" + dirs[i]);
    }
    return found;
}

const appLocation = findApp("./src");
if (appLocation === null) {
    throw new Error("Could not find App.js");
}

const findFinalImport = parts => parts.reduce((a,b,i)=>(
    b.substr(0,7)==="import "
    || b.substr(0,10)==="// import "
    || b.substr(0,9)==="//import "
)?i:a,0)

const addRoute = () => {
    fileReader.readFile(`${appLocation}/App.js`,"utf8",(err,content)=>{
        if (err) {
            throw(err);
        }
        const parts = content.split("\n");

        let finalRoute = parts.reduce((a,b,i)=>b.includes("<Route ")?i:a,null);

        if (finalRoute !== null) {
            const tabs = parts[finalRoute].split("<")[0].match(/\t/g).length;

            finalRoute += 1;
            parts.splice(finalRoute,0,`${Array(tabs).fill("\t").join("")}<Route path="${routePath}" component={${moduleName}} />`);

            const finalImportIndex = findFinalImport(parts);
            const importPath = path.replace(appLocation.replace("./","")+"/","");
            parts.splice(finalImportIndex+1,0,`import { ${moduleName} } from "./${importPath + '/' + moduleName + '.component'}";`);
        }

        fileReader.writeFile(`${appLocation}/App.js`,parts.join("\n"),()=>{});
    });
}

const addFile = () => {
    fileReader.writeFile("./" + path + "/" + moduleName + ".component.js",newFile,()=>{
        console.log("File: ", moduleName + ".component.js", ", added to: ", "./" + path + "/");
        if (routePath) {
            addRoute();
        }
    });
}

(function(){
    if (fileReader.existsSync("./" + path)) {
        return addFile();
    }
    const paths = path.split("/");
    paths.forEach((_,i)=>{
        const thisPath = "./" + paths.slice(0,i+1).join("/");
        if (!fileReader.existsSync(thisPath)) {
            fileReader.mkdirSync(thisPath);
        }
    });
    addFile();
}());
