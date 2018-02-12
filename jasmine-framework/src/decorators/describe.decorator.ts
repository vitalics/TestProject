// ignoring debug
/// TS_IGNORE
import { DescriptionNode, Executor, registerDecribeNode } from '../compiler';

export function describe(describe: DescriptionNode) {
  return (target: any): void => {
    registerDecribeNode(describe, target);

    Executor.execute();
  };
}
