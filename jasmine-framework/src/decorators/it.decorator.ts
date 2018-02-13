import 'reflect-metadata';
import { Executor, TestNode, TestTypes, TNode, isTNode, Class, registerTestNode, isClass } from '../compiler';

export function itt(description: string): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const newDescription = description || '';
    const tNode = registerTestNode(newDescription, descriptor, target, key);

    jasmine.getEnv().it(description, descriptor.value);

    return descriptor;
  };
}
