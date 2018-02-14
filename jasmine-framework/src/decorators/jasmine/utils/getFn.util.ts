import { TestNode } from '../../../compiler/interfaces';

export function getNodeFn(node: TestNode): () => any {
  if (node.static) {
    return node.parent[node.name];
  }
  if (!node.static) {
    return node.parent.exemplar[node.name].bind(node.parent.exemplar);
  }
}
