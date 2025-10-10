import * as path from 'path';

/**
 * Checks if a path should be ignored based on ignorePaths.
 */
export function shouldIgnorePath(
  dirPath: string,
  ignorePaths: string[]
): boolean {
  return ignorePaths.some(
    (ignoreName: string) =>
      dirPath.includes(path.sep + ignoreName + path.sep) ||
      dirPath.endsWith(path.sep + ignoreName)
  );
}
