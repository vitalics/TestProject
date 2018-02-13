import { Executor } from '../compiler';
export function run() {
  Executor.execute();
}

export interface ConfigOptions {
  exclude: string[];
}
export function register(config: ConfigOptions) {}
