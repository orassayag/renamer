import * as path from 'path';

/**
 * Checks if a path should be ignored based on ignorePaths.
 */
export function shouldIgnorePath(
  dirPath: string,
  ignorePaths: string[]
): boolean {
  const normalizedDir: string = dirPath.toLowerCase();
  return ignorePaths.some((ignoreName) => {
    const normalizedIgnore: string = ignoreName.toLowerCase();
    return (
      normalizedDir.includes(path.sep + normalizedIgnore + path.sep) ||
      normalizedDir.endsWith(path.sep + normalizedIgnore)
    );
  });
}
