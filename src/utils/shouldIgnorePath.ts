import * as path from 'path';

/**
 * Checks if a path should be ignored based on ignorePaths.
 */
export function shouldIgnorePath(
  dirPath: string,
  ignorePaths: string[]
): boolean {
  const normalizedPath: string = path.normalize(dirPath);
  const normalizedDir: string = normalizedPath.toLowerCase();
  return ignorePaths.some((ignoreName: string) => {
    const normalizedIgnore: string = ignoreName.toLowerCase();
    return (
      normalizedDir.includes(path.sep + normalizedIgnore + path.sep) ||
      normalizedDir.endsWith(path.sep + normalizedIgnore)
    );
  });
}
