import { AbstractCompiler } from "./compiler.d";
import { writeFile } from "fs";
export class Compiler implements AbstractCompiler {
    private compiledTest: string;
    private jasmine = require('jasmine');
    private its: string = '';
    private describe: string = '';
    private __tempDescription: string;

    constructor() {
    }

    public get CompiledTest(): string {
        return this.compiledTest;
    }

    compile(target: any) {
        this.recompile();
        this.writeToFile(target);
    }
    compileTest(target: Function | object) {
    }
    preCompileDescribe(description?: string, extraParams?: any): string {
        this.__tempDescription = description;
        console.log('compile describe');
        this.describe = `describe('${description}',()=>{
            ${this.its}
        })`
        // let realBody = body.substring(extraParams.indexOf("{") + 1, extraParams.lastIndexOf("}"));
        console.log('------------------');
        return this.describe;
    }
    // compileDescribe(describe: string, body: string) {
    //     let emptyBody = describe.substring(describe.indexOf("{") + 1,describe.lastIndexOf("}"));
        
    // }
    compileIt(target: Function, description?: string, ...args: any[]) {
        console.log('Compile it');
        var body = target.toString();
        let realBody = body.substring(body.indexOf("{") + 1, body.lastIndexOf("}"));
        let it = `it('${description}',()=>{${realBody}});`;
        this.its += it;
        console.log('----------------');

    }
    recompile() {
        console.log('recompile');
        this.describe = this.preCompileDescribe(this.__tempDescription);
    }
    writeToFile(target: any) {
        let filename = 'spec/file.spec.js';
        writeFile(filename, `${target.toString()}`, (err: NodeJS.ErrnoException) => {
            if (err) {
                return console.error(err);
            }
            console.log('Write is successfull')
        });
    }
}