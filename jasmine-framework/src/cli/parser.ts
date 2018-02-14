import { existsSync } from 'fs';

const arg = process.argv;

function isPath(path: string) {
  const isExist = existsSync(path);
  return isExist;
}
function getPath(pathLike: string[]): string {
  let realPath = '';
  for (const path of pathLike) {
    if (isPath(path)) {
      realPath = path;
    }
  }
  return realPath;
}
