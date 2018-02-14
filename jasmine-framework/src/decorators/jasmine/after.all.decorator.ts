import { registerTestNode, TestTypes } from '../../compiler';

export function afterAll(...args: any[]): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const tNode = registerTestNode(TestTypes.afterAll, args, descriptor, target, key);

    return descriptor;
  };
}
