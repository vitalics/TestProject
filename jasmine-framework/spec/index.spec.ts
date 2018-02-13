import { descr, itt } from '../src/decorators';

import { browser } from 'protractor';
import { autoExpect } from '../src/decorators/addToTest.decorator';

const someValue = 3;

@descr('test')
class A {
  @autoExpect public a = 1;
  constructor() {}

  @itt('temp')
  public simpleTest() {
    expect(this.a).toBe(1);
  }
}

@descr('test')
class B extends A {
  @autoExpect public b = 1;

  public constructor() {
    super();
    const initValue = 3;
    console.log(initValue);
  }

  @itt('test iterator')
  public testmethod(value: number): number {
    let num = 1;
    // console.log(num);
    // yield num;
    num++;
    console.log(num);
    return num;
  }

  @itt('test')
  public async testmethod2() {
    console.log(this.b);
  }
  @itt('test static')
  public static staticMember() {
    console.log('static');
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
