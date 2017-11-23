import "reflect-metadata";
import { Compiler } from '../compiler/compiler';
import { Command } from "selenium-webdriver";
let compiler: Compiler = new Compiler();

export function describe(description: string) {
    return function (target: Function) {
        console.log(`describe(${description}) called on: `, target);
        console.log(target.toString())
        compiler.preCompileDescribe(description)
    }
}
// export function describe<T extends { new(...args: any[]): {} }>(constructor: T) {
//     return class extends constructor implements Describe {
//         constructor(...args: any[]) {
//             super(...args)
//             compiler.compileDescribe(args);
//         }
//         extra = "Tadah!";
//     };
// }

interface Describe {
    text: string;
}
