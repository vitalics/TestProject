import "reflect-metadata";
export function leDecorator(randomData: string): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
        var oldValue = descriptor.value;

        descriptor.value = function () {
            console.log(`Calling "${propertyKey}" with`, arguments, target);
            let value = oldValue.apply(null, [arguments[1], arguments[0]]);

            console.log(`Function is executed`);
            return value + "; This is awesome; " + randomData;
        }
        return descriptor;
    }
}
