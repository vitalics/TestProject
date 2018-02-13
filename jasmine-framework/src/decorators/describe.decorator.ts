// ignoring debug
/// TS_IGNORE
import { DescriptionNode, Executor, registerDecribeNode } from '../compiler';
import { TestTypes, TestNode } from 'index';

export function descr(describe: string) {
  return (target: any): any => {
    const dNode = registerDecribeNode({ description: describe }, target);
    const cls = dNode.class;

    const describeJasmine = jasmine.getEnv().describe(describe, <any>cls);
    for (const node of cls.nodes) {
      if (node.keyword === TestTypes.it) {
        jasmine.getEnv().it(node.description, getNodeFn(node));
      }
    }
  };
}

function getNodeFn(node: TestNode): () => any {
  if (node.static) {
    return node.parent[node.name];
  }
  if (!node.static) {
    return node.parent.exemplar[node.name].bind(node.parent.exemplar);
  }
}
