import { registerDecribeNode, TestTypes, Executor } from '../../compiler';
import { getNodeFn } from './utils/getFn.util';

export function describe(description: string) {
  return (target: any): any => {
    const dNode = registerDecribeNode({ description: description }, target);
    const cls = dNode.class;

    Executor.registerDescribe(dNode);

    const env = jasmine.getEnv();

    const describeJasmine = env.describe(description, <any>cls);
    for (const node of cls.nodes) {
      switch (node.keyword) {
        case TestTypes.it:
          env.it(node.description, getNodeFn(node));
          break;

        case TestTypes.afterAll:
          describeJasmine.afterAll(getNodeFn(node));
          break;

        case TestTypes.afterEach:
          describeJasmine.afterEach(getNodeFn(node));
          break;

        case TestTypes.beforeAll:
          describeJasmine.beforeAll(getNodeFn(node));
          break;

        case TestTypes.beforeEach:
          describeJasmine.beforeEach(getNodeFn(node));
          break;

        default:
          return node;
      }
    }
  };
}
