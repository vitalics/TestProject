import { isClass } from './isClass';
import { Class, TestNode, TestTypes, isTNode, TNode, DescriptionNode } from '../interfaces';
import { Executor } from './executor';

export function registerTestNode(
  description: string = '',
  descriptor: TypedPropertyDescriptor<() => any>,
  target: any,
  key: string
) {
  var oldValue = descriptor.value;

  const protoName = Object.getPrototypeOf(oldValue).constructor.name;

  // let generator = false;
  // if (protoName === 'GeneratorFunction') {
  //   generator = true;
  // }
  // let async = trueNode.async || false;
  // if (async && protoName === 'GeneratorFunction') {
  //   throw new Error('async function cannot be with ' + protoName);
  // }
  let trueParent: Class = null;
  const parentCtor = <Class>target.constructor;
  const parent = <Class>target;
  let isStatic = false;
  trueParent = parentCtor;
  if (!isClass(parentCtor) && isClass(parent)) {
    isStatic = true;
    trueParent = parent;
  }
  if (!trueParent.hasOwnProperty('nodes')) {
    trueParent.nodes = [];
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
