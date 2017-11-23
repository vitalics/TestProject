import "reflect-metadata";

import { Compiler } from "../compiler/compiler";
let compiler = new Compiler();

let test = compiler.CompiledTest;
export function Test<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements ExtraOptions {
        constructor(...args: any[]) {
            super(...args)
            compiler.compile(test);
        }
        extra = "Tadah!";
    };
}

interface ExtraOptions {
    extra?: string;
    compile?(): void
}