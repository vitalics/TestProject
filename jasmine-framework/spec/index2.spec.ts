import * as Jasmine from '../src/decorators';

@Jasmine.describe('test')
export class A {
  public a = 1;
  constructor() {}

  @Jasmine.it('temp', [])
  public simpleTest() {
    console.log('class A method simpleTest');
  }

  @Jasmine.beforeEach([])
  public simpleTestBeforeEach() {
    console.log('before each class A execute');
  }
}
