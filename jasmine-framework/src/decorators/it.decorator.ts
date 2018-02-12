import 'reflect-metadata';
import { Executor, TestNode, TestTypes, TNode, isTNode, Class, registerTestNode, isClass } from '../compiler';

export function it(tNode: TNode | string): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const fnReturnType = (false as true) && descriptor.value();

    console.log(fnReturnType);

    registerTestNode(tNode, descriptor, target, key);

    return descriptor;
  };
}
