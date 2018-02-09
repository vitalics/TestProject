import { writeFile } from 'fs';
import { Executor, DescriptionNode, TestNode, TestTypes, getStaticMemebers } from '../compiler/executor';

export function describe(describe: DescriptionNode) {
  return (target: any): any => {
    describe.className = target;
    Executor.registerDescribe(describe);
    const staticMembers = getStaticMemebers(describe, describe.className);

    for (const i in describe.nodes) {
      const nodeElem = describe.nodes[i];
      for (const staticMember of staticMembers) {
        if (
          staticMember.description === nodeElem.description &&
          staticMember.keyword === nodeElem.keyword &&
          staticMember.name === nodeElem.name
        ) {
          Object.assign(describe.nodes[i], { ...staticMember });
        }
      }
    }
    console.log(describe.nodes);
    Executor.execute();
  };
}
