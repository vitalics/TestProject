import { registerTestNode, TestTypes } from '../../compiler';
export function afterEach(...args: any[]): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const tNode = registerTestNode(TestTypes.afterEach, args, descriptor, target, key);

    return descriptor;
  };
}
