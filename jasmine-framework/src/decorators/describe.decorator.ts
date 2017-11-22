import "reflect-metadata";
export function describe(description: string): ClassDecorator {
    return function (target: Function) {
        Reflect.defineMetadata("describe", description, target);
    };
}
