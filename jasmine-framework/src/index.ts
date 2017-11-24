import "reflect-metadata";

import { describe, it, Test } from "./decorators";
import { ITestClass, TestClass } from "./test";

let testClass: TestClass = new TestClass();
@Test
@describe('test description')
class Greeter {

    constructor(testClass: TestClass) {
        testClass.its(this.anotherMethod, this.getSomeValue)
    }

    @it("test")
    public getSomeValue() {
        console.log('some test')
    }
    @it('another test')
    public anotherMethod() {
        console.log('another test')
    }
    method() {
        console.log('method');
    }
}
// var myClass: Greeter = new Greeter(testClass);
testClass.execute(new Greeter(testClass));
