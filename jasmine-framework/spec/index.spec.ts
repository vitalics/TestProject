import { descr, itt } from '../src/decorators';

import { browser } from 'protractor';

const someValue = 3;

@descr('test')
class A {
  public a = 1;
  constructor() {}

  @itt('temp')
  public simpleTest() {
    console.log('class A method simpleTest');
    console.log('context for A clas', this.a);
  }
}

@descr('test')
class B extends A {
  public b = 1;

  public constructor() {
    super();
  }

  @itt('test iterator')
  public testmethod1(value: number): void {
    console.log('class B method testmethod1');
    console.log('context for B clas', this.a, this.b);
  }

  @itt('test')
  public async testmethod2() {
    console.log('class B method testmethod2');
    console.log('context for B clas', this.a, this.b);
  }
  @itt('test static')
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
