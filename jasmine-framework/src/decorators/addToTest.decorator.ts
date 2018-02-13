import 'reflect-metadata';
import { Class } from '../compiler/interfaces';

export function autoExpect(target: any, key: string): any {
  // property value
  let _staticVal = target[key];
  let nonStaticVal = <Class>new target.constructor();
  const val = nonStaticVal[key];

  let realValue = _staticVal || val;

  // property getter
  var getter = function() {
    expect(realValue);
    return realValue;
  };

  // property setter
  var setter = function(newVal: any) {
    realValue = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter
  });
}
