// ignoring debug
/// TS_IGNORE
import { DescriptionNode, Executor, registerDecribeNode } from '../compiler';

export function descr(describe: string) {
  return (target: any): any => {
    const dNode = registerDecribeNode({ description: describe }, target);
    console.log(dNode);

    const describeJasmine = jasmine.getEnv().describe(describe, <any>dNode.class);
  };
}
