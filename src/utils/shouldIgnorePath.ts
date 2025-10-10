import * as path from 'path';

/**
 * Checks if a path should be ignored based on ignorePaths.
 */
export function shouldIgnorePath(
  dirPath: string,
  ignorePaths: string[]
): boolean {
  const normalizedPath: string = path.normalize(dirPath);
  const isWindows: boolean = process.platform === 'win32';
  const normalizedDir: string = isWindows
    ? normalizedPath.toLowerCase()
    : normalizedPath;
  return ignorePaths.some((ignoreName: string) => {
    const normalizedIgnore: string = isWindows
      ? ignoreName.toLowerCase()
      : ignoreName;
    return (
      normalizedDir.includes(path.sep + normalizedIgnore + path.sep) ||
      normalizedDir.endsWith(path.sep + normalizedIgnore)
    );
  });
}
