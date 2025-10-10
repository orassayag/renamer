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
  const separatorIndex: number = fileName.indexOf(separator);
  // Check if separator exists in filename.
  if (separatorIndex === -1) {
    console.log('⊘ Separator not exists in file name, skipping...');
    return renamedFilesCount;
  }
  // Extract the part before the separator.
  const prefix: string = fileName.substring(0, separatorIndex);
  // Check if prefix exactly matches any of the target names.
  if (targetNames.includes(prefix)) {
    const suffix: string = fileName.substring(separatorIndex); // Includes separator and everything after.
    const newFileName: string = replaceName + suffix;
    const newFilePath: string = path.join(path.dirname(filePath), newFileName);
    try {
      await fs.promises.rename(filePath, newFilePath);
      renamedFilesCount++;
      console.log(
        `✓ Renamed: ${fileName} → ${newFileName} (Number ${renamedFilesCount})`
      );
      // Sleep after rename.
      await sleep(sleepAfterMilliseconds);
    } catch (error) {
      console.error(`✗ Failed to rename ${fileName}:`, error);
    }
  }
  return renamedFilesCount;
}
