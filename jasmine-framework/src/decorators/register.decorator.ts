import { Compiler } from "../compiler/compiler";
// let compiler: Compiler = new Compiler();
export function register(extraParams?: any): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
        var oldValue = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`Calling "${propertyKey}" with`, arguments, target);

            Compiler.compileFunction(oldValue, propertyKey);
            // return oldValue.apply(this, args);
        }
        return descriptor;
    }
}
