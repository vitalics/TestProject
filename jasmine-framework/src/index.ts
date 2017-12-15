import "reflect-metadata";

import { describe, it, Test, register } from "./decorators";
import { ITestClass, TestClass } from "./test";

let testClass: TestClass = new TestClass();
@Test
@describe('test description')
class Greeter {

    constructor(testClass: TestClass) {
        testClass.helpers(this.method);
        testClass.its(this.anotherMethod, this.getSomeValue)
    }

    @it("test")
    public getSomeValue() {
        expect('lol').toEqual('lol')
    }
    @it('another test')
    public anotherMethod() {
        console.log('another test');
        this.method();
    }

    @register()
    method() {
        console.log('method');
    }
}
// var myClass: Greeter = new Greeter(testClass);
testClass.executeTest(new Greeter(testClass));
