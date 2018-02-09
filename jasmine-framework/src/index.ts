import { writeFile, writeFileSync } from 'fs';

// import 'reflect-metadata';

// import { describe, it, Test } from './decorators';
// import { ITestClass, TestClass } from './test';
// import { writeFile } from 'fs';

// let testClass: TestClass = new TestClass();
// @Test
// @describe('test description')
// class Greeter {
//   constructor(testClass: TestClass) {
//     testClass.helpers(this.method);
//     testClass.its(this.anotherMethod, this.getSomeValue);
//   }

//   @it('test')
//   public getSomeValue() {
//     expect('lol').toEqual('lol');
//   }
//   @it('another test')
//   public anotherMethod() {
//     console.log('another test');
//     this.method();
//   }

//   method() {
//     console.log('method');
//   }
// }
// // var myClass: Greeter = new Greeter(testClass);
// // testClass.executeTest(new Greeter(testClass));
// class TestedClass {
//   public get something(): number {
//     return 1;
//   }
//   public somethis: number = 5;
//   constructor(name: string = '', private name1: string) {}

//   public someMethod(someValue: string): number {
//     console.log('some method');
//     return 1;
//   }
// }

// const testedClass = new TestedClass('123', '456');
// testedClass.someMethod('hello');

let describeFunc = `
describe('test', () => {
  it('test it', () => {
    expect(true).toBeTruthy();
    console.log('passed');
  });
});
`;
writeFileSync('test.spec.ts', describeFunc, 'utf-8');
