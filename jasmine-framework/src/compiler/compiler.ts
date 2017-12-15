import { AbstractCompiler } from "./compiler.d";
import { writeFile } from "fs";
import { StringUtils } from "../utils";
export class Compiler implements AbstractCompiler {
    private static its: string = '';

    private static describe: string = '';
    private static __tempDescription: string;

    private static helperFunctions: string = '';
    private static fcnNames: string[] = [];

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
        describeBody += this.helperFunctions;
        return this.describe.slice(0, idexOfBody) + describeBody + '});';
    }
    // compileDescribe(describe: string, body: string) {
    //     let emptyBody = describe.substring(describe.indexOf("{") + 1,describe.lastIndexOf("}"));

    // }
    static compileFunction(target: Function, name: string) {
        let fcnContext = target.toString();
        let fcnCompiled = '';
        fcnCompiled = StringUtils.insert(fcnContext, 9, name)
        this.helperFunctions += fcnCompiled;
        this.fcnNames.push(name);
    }
    static compileIt(target: Function, description?: string, ...args: any[]) {
        console.log('Compile it');
        var body = target.toString();
        let realBody = body.substring(body.indexOf("{") + 1, body.lastIndexOf("}"));
        let it = `it('${description}',()=>{${realBody}});`;
        it = this.fcnCleanUp(it);
        this.its += it;
        console.log('----------------');
    };

    private getRecurseContext(test: string) { }
    private static fcnCleanUp(it: string): string {
        let returnString = '';
        returnString = it.replace(`this.${this.fcnNames}`, `${this.fcnNames}`);
        return returnString;
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