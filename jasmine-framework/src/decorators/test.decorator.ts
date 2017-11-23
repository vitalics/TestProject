import "reflect-metadata";

import { Compiler } from "../compiler/compiler";


// let test = compiler.CompiledTest;

export function Test<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements ExtraOptions {
        constructor(...args: any[]) {
            super(...args)
            let test = Compiler.getTest();
            Compiler.compile(test);
        }
    };
}

interface ExtraOptions {
    extra?: string;
    compile?(): void
}