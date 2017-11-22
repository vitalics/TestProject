import { AbstractCompiler } from "./compiler.d";
export class Compiler implements AbstractCompiler {
    constructor() { }
    compile(target: any) {
        switch (target.id_name) {
            case 'test':
                this.compileTest(target);
                break;
            case 'describe':
                this.compileDescribe(target);
                break;
            case 'it':
                this.compileIt(target);
                break;
            default:
                throw new Error('Cannot compile any params')
        }
    }
    compileTest(target: Function | object) {
        console.log("compile target");
        console.log(target);
        console.log("---------------------");
    }
    compileDescribe(target: object) { }
    compileIt(target: object) { }
}