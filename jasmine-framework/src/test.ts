export class TestClass implements ITestClass {
    constructor() { }
    public beforeEach(...callBacks: Function[]): void { }
    public its(...callbacks: Function[]): void {
        for (let index = 0; index < callbacks.length; index++) {
            try {
                let executedFcn = callbacks[index];
                executedFcn();
            } catch (error) {
                throw new Error(error)
            }
        }
    }
    public execute<T>(someClass: T): T {
        return someClass;
    }
}
export interface ITestClass {
    beforeEach(...callbacks: Function[]): void
    its(...callbacks: Function[]): void
    execute<T>(Someclass: T): void
}