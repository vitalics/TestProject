import { AbstractCompiler } from "./compiler.d";
import { writeFile } from "fs";
export class Compiler implements AbstractCompiler {
    private static its: string = '';

    private static describe: string = '';
    private static __tempDescription: string;

    constructor() {
    }


    static compile(target: any) {
        target = this.compileDescribe(this.its);
        this.writeToFile(target);
    }
    static getTest(target?: any): string {
        return this.describe;
    }
    static preCompileDescribe(description?: string, extraParams?: any): void {
        this.__tempDescription = description;
        console.log('compile describe');
        this.describe = `describe('${description}',()=>{})`
        // let realBody = body.substring(extraParams.indexOf("{") + 1, extraParams.lastIndexOf("}"));
        console.log('------------------');
    }

    static compileDescribe(its: string): string {
        let idexOfBody = this.describe.lastIndexOf("}");
        let describeBody = this.describe.substring(this.describe.indexOf("{") + 1, this.describe.lastIndexOf('}'))
        describeBody += its;
        return this.describe.slice(0, idexOfBody) + describeBody + '});';
    }
    // compileDescribe(describe: string, body: string) {
    //     let emptyBody = describe.substring(describe.indexOf("{") + 1,describe.lastIndexOf("}"));

    // }
    static compileIt(target: Function, description?: string, ...args: any[]) {
        console.log('Compile it');
        var body = target.toString();
        let realBody = body.substring(body.indexOf("{") + 1, body.lastIndexOf("}"));
        let it = `it('${description}',()=>{${realBody}});`;
        this.its += it;
        console.log('----------------');
    }
    // recompile() {
    //     console.log('recompile');
    //     this.compileDescribe(this.its);
    //     // this.describe = this.preCompileDescribe(this.__tempDescription);
    // }
    static writeToFile(target: any) {
        let filename = 'spec/file.spec.js';
        writeFile(filename, `${target.toString()}`, (err: NodeJS.ErrnoException) => {
            if (err) {
                return console.error(err);
            }
            console.log('Write is successfull')
        });
    }
}