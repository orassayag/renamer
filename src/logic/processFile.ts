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
  const prefix: string = fileName.substring(0, separatorIndex);
  // Check if prefix exactly matches any of the target names.
  if (targetNames.includes(prefix)) {
    const suffix: string = fileName.substring(separatorIndex); // Includes separator and everything after.
    const newFileName: string = replaceName + suffix;
    const newFilePath: string = path.join(
      path.dirname(normalizedFilePath),
      newFileName
    );
    try {
      try {
        await fs.promises.access(normalizedFilePath, fs.constants.F_OK);
      } catch {
        console.warn(`⚠️ Skipping: file "${fileName}" no longer exists`);
        return renamedFilesCount;
      }
      if (normalizedFilePath !== newFilePath) {
        await fs.promises.rename(normalizedFilePath, newFilePath);
      } else {
        console.warn(`⚠️ Skipping rename: source and destination are the same`);
      }
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
