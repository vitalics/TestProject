import { isClass } from './isClass';
import { Class, TestNode, TestTypes, isTNode, TNode, DescriptionNode } from '../interfaces';
import { Executor } from './executor';
import { ClassConstructor } from '../interfaces';

export function registerTestNode(
  type: TestTypes,
  argsVars: any[] = [],
  descriptor: TypedPropertyDescriptor<() => any>,
  target: any,
  key: string,
  description: string = ''
) {
  var oldValue = descriptor.value;

  descriptor.value = function(...args: any[]) {
    var a = args.map((a) => JSON.stringify(a)).join();
    var result = oldValue.apply(this, argsVars);
  };

  let trueParent: ClassConstructor = null;
  const parentCtor = <ClassConstructor>target.constructor;
  const parent = <ClassConstructor>target;

  let isStatic = false;
  trueParent = parentCtor;

  if (!isClass(parentCtor) && isClass(parent)) {
    isStatic = true;
    trueParent = parent;
  }

  if (!trueParent.hasOwnProperty('nodes')) {
    trueParent.nodes = [];
  }

  if (!trueParent.hasOwnProperty('exemplar')) {
    trueParent.exemplar = new trueParent();
  }

  const node: TestNode = {
    parent: trueParent,
    description: description,
    keyword: type,
    name: key,
    static: isStatic
  };

  trueParent.nodes.push(node);
  return node;
}

export function registerDecribeNode(describe: DescriptionNode, target: any) {
  const isCls = isClass(target);
  let trueparent: ClassConstructor;
  if (!isCls) {
    throw new Error('describe must be decorating a class');
  }

  describe.class = target;
  const parent = target.__proto__;
  isClass(parent) ? (describe.parent = parent) : (describe.parent = null);

  return describe;

  // Executor.registerDescribe(describe);
}
