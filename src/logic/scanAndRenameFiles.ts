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
  const queue: string[] = [path.normalize(dirPath)];
  while (queue.length > 0) {
    const currentDir = queue.shift()!;
    try {
      const entries: fs.Dirent[] = await fs.promises.readdir(currentDir, {
        withFileTypes: true,
      });
      for (const entry of entries) {
        const fullPath: string = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          if (shouldIgnorePath(fullPath, ignorePaths)) {
            console.log(`⊘ Skipping ignored directory: ${fullPath}`);
            continue;
          }
          queue.push(fullPath); // Add to queue for iterative processing.
        } else if (entry.isFile()) {
          renamedFilesCount = await processFile(
            fullPath,
            entry.name,
            renamedFilesCount
          );
        }
      }
    } catch (error) {
      console.error(
        `✗ Error scanning directory "${currentDir}" (1000001):`,
        error
      );
    }
  }
  return renamedFilesCount;
}
