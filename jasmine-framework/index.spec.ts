import { descr, itt } from './src/decorators';

import { browser } from 'protractor';

const someValue = 3;

@descr({ description: 'test', priority: 2 })
class A {
  public a = 1;
  constructor() {}

  @itt({ description: 'temp' })
  public simpleTest() {
    browser.get('vk.com');
    browser.sleep(5000);
    console.log(this.a);
    expect(this.a).toBe(1);
  }
}

@descr({ description: 'test', priority: 1 })
class B extends A {
  public a = 1;

  public constructor() {
    super();
    const initValue = 3;
    console.log(initValue);
  }

  @itt({ description: 'test iterator' })
  public *testmethod(value: number): IterableIterator<number> {
    let num = 1;
    console.log(num);
    yield num;
    num++;
    console.log(num);
    return num;
  }

  @itt({ description: 'test' })
  public async testmethod2() {
    console.log(this.a);
  }
  @itt({ description: 'test static' })
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
