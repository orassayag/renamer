import * as fs from 'fs';
import * as path from 'path';
import { processFile } from './processFile';

/**
 * Recursively scans directory and renames files matching the target pattern.
 */
export async function scanAndRenameFiles(
  dirPath: string,
  ignorePaths: string[],
  renamedFilesCount: number = 0
): Promise<number> {
  try {
    const entries: fs.Dirent[] = await fs.promises.readdir(dirPath, {
      withFileTypes: true,
    });
    for (const entry of entries) {
      const fullPath: string = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        // Check if this directory should be ignored.
        if (ignorePaths.includes(entry.name)) {
          console.log(`⊘ Skipping ignored directory: ${fullPath}`);
          continue;
        }
        // Recursively scan subdirectories.
        renamedFilesCount = await scanAndRenameFiles(
          fullPath,
          ignorePaths,
          renamedFilesCount
        );
      } else if (entry.isFile()) {
        // Process files.
        renamedFilesCount = await processFile(
          fullPath,
          entry.name,
          renamedFilesCount
        );
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}: (1000001)`, error);
  }
  return renamedFilesCount;
}
