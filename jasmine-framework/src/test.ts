export class TestClass implements ITestClass {
    constructor() { }
    public beforeEach(...callBacks: Function[]): void {
        this.getFcnContext(...callBacks)
    }
    public its(...callbacks: Function[]): void {
        this.getFcnContext(...callbacks);
    }
    public helpers(...callbacks: Function[]) {
        this.getFcnContext(...callbacks);
    }

    private getFcnContext<T>(...args: any[]): void {
        for (let index = 0; index < args.length; index++) {
            try {
                let executedFcn = args[index];
                executedFcn();
            } catch (error) {
                throw new Error(error)
            }
        }
    }
    public executeTest<T>(someClass: T): T {
        return someClass;
    }
}
export interface ITestClass {
    beforeEach(...callbacks: Function[]): void
    its(...callbacks: Function[]): void
    executeTest<T>(Someclass: T): void
}