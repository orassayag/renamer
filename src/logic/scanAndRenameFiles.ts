import * as fs from 'fs';
import * as path from 'path';
import { processFile } from './processFile';
import { shouldIgnorePath } from '../utils';

/**
 * Recursively scans directory and renames files matching the target pattern.
 */
export async function scanAndRenameFiles(
  dirPath: string,
  ignorePaths: string[],
  renamedFilesCount: number = 0
): Promise<number> {
  try {
    const normalizedDirPath: string = path.normalize(dirPath);
    const entries: fs.Dirent[] = await fs.promises.readdir(normalizedDirPath, {
      withFileTypes: true,
    });
    for (const entry of entries) {
      const fullPath: string = path.join(normalizedDirPath, entry.name);
      if (entry.isDirectory()) {
        // Check if this directory should be ignored.
        if (shouldIgnorePath(fullPath, ignorePaths)) {
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
    console.error(`✗ Error scanning directory "${dirPath}" (1000001):`, error);
    return renamedFilesCount;
  }
  return renamedFilesCount;
}
