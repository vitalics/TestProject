export interface DescriptionNode {
  description: string;
  class?: ClassConstructor; // name of called class
  priority?: number;
  nodes?: TestNode[];
  parent?: ClassConstructor;
}
export interface TNode {
  description: string;
  async?: boolean;
}
export interface TestNode extends TNode {
  name: string;
  keyword: TestTypes;

  static?: boolean;
  generator?: boolean;
  parent?: Class;
}

export interface ClassConstructor extends Class {
  new (): Class;
}
export class Class {
  [key: string]: any;

  name: string;
  nodes?: TestNode[];
}

interface ClassLike<T extends Class> {
  constructor: T;
}

export const enum TestTypes {
  it = 'it',
  describe = 'describe',
  beforeEach = 'beforeEach',
  afterEach = 'afterEach',
  beforeAll = 'beforeAll',
  afterAll = 'afterAll'
}
export function isTNode(tNode: any): tNode is TNode {
  return 'description' in tNode || ('description' in tNode && 'async' in tNode);
}
