import * as Jasmine from '../src/decorators';

import { A } from './index2.spec';

const someValue = 3;
const someValue1 = 4;

@Jasmine.describe('test')
class B  {
  public b = 1;

  public constructor() {
    // super();
  }
  @Jasmine.beforeAll()
  public testmethodBeforeAll(value: number): void {
    console.log('before all class B executing');
  }

  @Jasmine.afterAll()
  public testmethodAfterAll(value: number): void {
    console.log('after all class B executing');
  }

  @Jasmine.it('test iterator')
  public testmethod1(value: number): void {
    console.log('class B method testmethod1');
  }

  @Jasmine.it('temp', [ someValue1 ])
  public async simpleTestAsync(someArg: number) {
    await this.simplePromise();
    console.log('class A method simpleTest async');
  }

  @Jasmine.it('test')
  public async testmethod2() {
    console.log('class B method testmethod2');
  }

  @Jasmine.it('test static')
  public static staticMember() {
    console.log('class B method staticMember');
  }
  private simplePromise(num: number = 1) {
    return new Promise((resolve, reject) => {
      if (num <= 5) {
        resolve(num);
        console.log('num <= 5');
      } else {
        reject(num);
        console.log('num > 5');
      }
      return num;
    });
  }
}
