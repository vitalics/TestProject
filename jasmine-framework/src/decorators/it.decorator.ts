import "reflect-metadata";
import { Compiler } from "../compiler/compiler";
// let compiler: Compiler = new Compiler();
export function leDecorator(description: string): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
        var oldValue = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`Calling "${propertyKey}" with`, arguments, target);
            //let value = oldValue.apply(null, [arguments[1], arguments[0]]);

            Compiler.compileIt(oldValue, description, args);
            // return oldValue.apply(this, args);
        }
        return descriptor;
    }
}
