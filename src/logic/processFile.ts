import * as fs from 'fs';
import * as path from 'path';
import { SETTINGS } from '../settings';
import { sleep } from '../utils';

const { targetNames, replaceName, separator, sleepAfterMilliseconds } =
  SETTINGS;

/**
 * Checks if file matches pattern and renames it.
 */
export async function processFile(
  filePath: string,
  fileName: string,
  renamedFilesCount: number
): Promise<number> {
  const normalizedFilePath: string = path.normalize(filePath);
  const separatorIndex: number = fileName.indexOf(separator);
  // Check if separator exists in filename.
  if (separatorIndex === -1) {
    console.log(
      `⊘ Skipping "${fileName}" — separator "${separator}" not found`
    );
    return renamedFilesCount;
  }
  // Extract the part before the separator.
  const [prefix] = fileName.split(separator, 1);
  // Check if prefix exactly matches any of the target names.
  if (targetNames.includes(prefix)) {
    const suffix: string = fileName.substring(separatorIndex); // Includes separator and everything after.
    const newFileName: string = replaceName + suffix;
    const newFilePath: string = path.join(
      path.dirname(normalizedFilePath),
      newFileName
    );
    try {
      if (!(await fs.promises.stat(normalizedFilePath).catch(() => null))) {
        // If files are renamed/moved by other processes concurrently, this prevents unhandled promise rejections.
        console.log('Already renamed/moved by other processes concurrently');
        return renamedFilesCount;
      }
      await fs.promises.rename(normalizedFilePath, newFilePath);
      renamedFilesCount++;
      console.log(
        `✓ Renamed: ${fileName} → ${newFileName} (Number ${renamedFilesCount})`
      );
      // Sleep after rename.
      await sleep(sleepAfterMilliseconds);
    } catch (error) {
      console.error(
        `✗ Failed to rename file "${fileName}" at "${normalizedFilePath}" (1000000):`,
        error
      );
    }
  }
  return renamedFilesCount;
}
