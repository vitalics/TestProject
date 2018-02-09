import { describe, it } from './src/decorators/';

@describe({ description: 'test', priority: 1 })
class B {
  public a = 1;

  @it('test')
  public testmethod() {
    console.log(this.a);
    this.a = 13;
    console.log(this.a);
  }

  @it('test')
  public testmethod2() {
    console.log(this.a);
  }
  @it('test static ')
  public static staticMember() {
    console.log('static');
  }
}
const a = new B();
a.a = 1;
