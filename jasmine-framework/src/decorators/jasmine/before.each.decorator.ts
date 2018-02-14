import { registerTestNode, TestTypes } from '../../compiler';
export function beforeEach(...args: any[]): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const tNode = registerTestNode(TestTypes.beforeEach, args, descriptor, target, key);

    return descriptor;
  };
}
