import "reflect-metadata";
export function Test<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements ExtraOptions {
        extra = "Tadah!";
    };
}

interface ExtraOptions {
    extra?: string;
}