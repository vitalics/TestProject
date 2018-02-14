import { registerTestNode, TestTypes } from '../../compiler';
export function beforeAll(...args: any[]): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const tNode = registerTestNode(TestTypes.beforeAll, args, descriptor, target, key);

    return descriptor;
  };
}
