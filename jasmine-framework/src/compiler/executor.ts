export class Executor {
  private static executionArr: DescriptionNode[] = [];
  private static tempDescribe: DescriptionNode = { description: '', priority: -1, nodes: [] };
  public static getExecutionArr() {
    return this.executionArr;
  }
  public static execute() {
    for (const test of this.executionArr) {
      const exemplar = new test.className();
      const className = test.className;
      for (const node of test.nodes) {
        node.static ? className[node.name]() : exemplar[node.name]();
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
    descr.nodes = this.tempDescribe.nodes;

    this.tempDescribe = null;
    this.executionArr.push(descr);
    this.executionArr.sort((currNode, nextNode) => currNode.priority - nextNode.priority);
  }
  public static registerTestNode(test: TestNode) {
    this.tempDescribe.nodes.push(test);
  }
}
export interface DescriptionNode {
  description: string;
  className?: any; // name of called class
  priority?: number;
  nodes?: TestNode[];
}
export interface TestNode {
  name: string;
  description: string;
  keyword: TestTypes;
  static?: boolean;
}

export const enum TestTypes {
  it = 'it',
  describe = 'describe',
  beforeEach = 'beforeEach',
  afterEach = 'afterEach',
  beforeAll = 'beforeAll',
  afterAll = 'afterAll'
}
export function getStaticMemebers(parent: DescriptionNode, target: any): TestNode[] {
  let staticMembers: TestNode[] = [];
  const nodes = parent.nodes;
  for (const key in target) {
    const findedStaticNode = nodes.find((node) => node.name === key);

    const staticMember: TestNode = {
      name: findedStaticNode.name,
      description: findedStaticNode.description,
      keyword: findedStaticNode.keyword,
      static: true
    };

    staticMembers.push(staticMember);
  }
  return staticMembers;
}
