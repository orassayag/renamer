import * as fs from 'fs';
import * as path from 'path';
import { processFile } from './processFile';

/**
 * Recursively scans directory and renames files matching the target pattern.
 */
export async function scanAndRenameFiles(
  dirPath: string,
  ignorePaths: string[]
): Promise<void> {
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
        await scanAndRenameFiles(fullPath, ignorePaths);
      } else if (entry.isFile()) {
        // Process files.
        await processFile(fullPath, entry.name);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
}
