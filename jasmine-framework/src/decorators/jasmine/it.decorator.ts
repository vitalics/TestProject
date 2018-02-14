import { registerTestNode, TestTypes } from '../../compiler';
export function it(description: string, bindArguments: any[] = []): any {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<() => any>): typeof descriptor => {
    const newDescription = description || '';
    const tNode = registerTestNode(TestTypes.it, bindArguments, descriptor, target, key, newDescription);

    return descriptor;
  };
}
