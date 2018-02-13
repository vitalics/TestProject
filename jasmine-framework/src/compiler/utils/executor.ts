import { isNumber } from 'util';
import { TestNode, DescriptionNode, TestTypes } from '../interfaces';

export class Executor {
  private static executionArr: DescriptionNode[] = [];
  private static tempDescribe: DescriptionNode = { description: '', priority: -1, nodes: [] };
  private static nodes: TestNode[] = [];
  public static getExecutionArr() {
    return this.executionArr;
  }
  public static getDescribeNodes(descr: DescriptionNode) {
    return descr.nodes;
  }
  public static async execute() {
    this.executionArr.sort((currNode, nextNode) => currNode.priority - nextNode.priority);
    for (const test of this.executionArr) {
      const cls = test.class;
      const exemplar = new cls();
      for (const node of cls.nodes) {
        
      }
    }
  }
  private static executeDescribe(exemplar: any, nodes: TestNode[]) {
    nodes.sort((curr, next) => {
      if (curr.keyword === TestTypes.beforeAll) return 1;
      if (curr.keyword === TestTypes.it) return 1;
    });
    for (const node of nodes) {
      exemplar[node.name]();
    }
  }
  public static registerDescribe(descr: DescriptionNode) {
    this.executionArr.push(descr);
  }
  public static *rebuildNodes(nodes: TestNode[]): IterableIterator<TestNode[]> {
    for (const node of nodes) {
      // make normalize node
    }
    return nodes;
  }
  public static *getNextNode(): IterableIterator<TestNode> {
    for (const node of this.nodes) {
      if (!node) {
        return node;
      }
      yield node;
    }
  }
}
