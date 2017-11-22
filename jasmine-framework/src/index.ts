import "reflect-metadata";

import { describe, leDecorator, Test } from "./decorators";

@Test
@describe("my metadata")
class Greeter {
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

var myClass: Greeter = new Greeter();
myClass.anotherMethod();