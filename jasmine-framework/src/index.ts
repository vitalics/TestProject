import "reflect-metadata";

import { describe, leDecorator, Test } from "./decorators";
import { ITestClass, TestClass } from "./test";

let testClass: TestClass = new TestClass();
@Test
@describe('test description')
class Greeter {

    constructor(testClass: TestClass) {
        testClass.its(this.anotherMethod, this.getSomeValue)
    }

    @leDecorator("test")
    public getSomeValue() {
        console.log('some test')
    }
    @leDecorator('another test')
    public anotherMethod() {
        console.log('another test')
    }
    method() {
    }
}

var myClass: Greeter = new Greeter(testClass);
