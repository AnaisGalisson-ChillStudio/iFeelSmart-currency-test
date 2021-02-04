const exit = require("process").exit;

const write = require('write');
const _ = require("lodash")
const params = process.argv.slice(2, process.argv.length)

function toPascalCase(text) {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text) {
    return text.replace(/-/, "").toUpperCase();
}


const params1 = params[1]
const params1PascalCase = toPascalCase(params1)
const componentFileName = "index.tsx"
const interfaceFileName = params1 + ".d.ts"
const styleFileName = "style.ts"
const params1StartCase = _.startCase(params1)

let path = ""
if (params[0] == "c") {
    path = "./src/components/"
}
else if (params[0] == "v") {
    path = "./src/views/"
} else if (params[0] == "m") {
    path = "./src/models/"
} else if (params[0] == "t") {
    path = "./src/templates/"
} else {
    console.warn("\n")
    console.warn("ERROR : Use 'c' , 'v' or  't' before your component folder name to generate component ,view or template")
    console.warn("\n");
    exit(-1)
}



if (params[0] == "c" || params[0] == "v" || params[0] == "t") {

    const componentCode = `
import React from 'react'
import {${params1PascalCase}Props} from "./${params1}"
import s from "./style"
import { View } from 'native-base'

/* 
*/
function ${params1PascalCase}(p: ${params1PascalCase}Props) {
    return (
        <View style={s.root}>
        </View>
    )
}

export default ${params1PascalCase}`


    const interfaceCode = `export interface ${params1PascalCase}Props{
    
}`

    const styleCode = `import { StyleSheet } from 'react-native'
export default StyleSheet.create({

    root: {
        
    }

});`



    write.sync(path + params1 + "/" + componentFileName, componentCode, { newline: true });
    write.sync(path + params1 + "/" + interfaceFileName, interfaceCode, { newline: true });
    write.sync(path + params1 + "/" + styleFileName, styleCode, { newline: true });


}
else if (params[0] == "m") {
    const modelCode = `
    import { createModel } from '@rematch/core'
    /**
     * 
     */
    export type ${params1PascalCase}State = {
    }
    
    const model = {
        name: "${_.camelCase(params1)}",
        state: {
            todo: ""
        } as ${params1PascalCase}State,
        reducers: {
    
            todo: (state: ${params1PascalCase}State) => ({
                ...state,
                todo: "todo"
            }),
            
        },
    
        effects: () => ({
    
        }),
    }
    
    export const ${params1}: typeof model = createModel(model)`

    const hooksCode = `
    import { useSelector } from "react-redux";
import { ${params1PascalCase}State } from "../models/${params1}";
import { IStore } from "../store";
const use${params1PascalCase} = (): ${params1PascalCase}State => {
    return useSelector<IStore, ${params1PascalCase}State>((state: IStore): ${params1PascalCase}State => state.${params1})
}
export default use${params1PascalCase};`
    write.sync(path + "/" + params1 + ".ts", modelCode, { newline: true });
    write.sync("./src/hooks/use-" + params1 + ".ts", hooksCode, { newline: true });

}