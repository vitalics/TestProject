import 'reflect-metadata';
import { Executor, TestNode, TestTypes, getStaticMemebers } from '../compiler/executor';

export function it(description: string): any {
  return (target: any, key: string, descriptor: any): any => {
    var oldValue = descriptor.value;

    const node: TestNode = {
      description,
      keyword: TestTypes.it,
      name: key
    };

    Executor.registerTestNode(node);

    return descriptor;
  };
}
