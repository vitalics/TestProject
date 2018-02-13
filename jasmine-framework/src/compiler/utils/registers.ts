import { isClass } from './isClass';
import { Class, TestNode, TestTypes, isTNode, TNode, DescriptionNode } from '../interfaces';
import { Executor } from './executor';
import { ClassConstructor } from 'index';

export function registerTestNode(
  description: string = '',
  descriptor: TypedPropertyDescriptor<() => any>,
  target: any,
  key: string
) {
  var oldValue = descriptor.value;

  const protoName = Object.getPrototypeOf(oldValue).constructor.name;

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
    keyword: TestTypes.it,
    name: key,
    static: isStatic
  };

  trueParent.nodes.push(node);
  return node;
}

export function registerDecribeNode(describe: DescriptionNode, target: any) {
  const isCls = isClass(target);
  if (!isCls) {
    throw new Error('describe must be decorating a class');
  }

  describe.class = target;
  describe.parent = target.__proto__;

  return describe;

  // Executor.registerDescribe(describe);
}
