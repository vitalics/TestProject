import { describe, it } from './src/decorators';

const someValue = 3;

@describe({ description: 'test', priority: 2 })
class A {
  public a = 1;
  constructor() {}

  @it({ description: 'temp' })
  public simpleTest() {
    console.log(this.a);
  }
}

@describe({ description: 'test', priority: 1 })
class B extends A {
  public a = 1;

  public constructor() {
    super();
    const initValue = 3;
    console.log(initValue);
  }

  @it({ description: 'test iterator' })
  public *testmethod(value: number): IterableIterator<number> {
    let num = 1;
    console.log(num);
    yield num;
    num++;
    console.log(num);
    return num;
  }

  @it({ description: 'test' })
  public async testmethod2() {
    console.log(this.a);
  }
  @it({ description: 'test static' })
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
