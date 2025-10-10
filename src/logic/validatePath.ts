import * as fs from 'fs';

/**
 * Check if scan path exists.
 */
export async function validatePath(scanPath: string) {
  try {
    const stats: fs.Stats = await fs.promises.stat(scanPath);
    if (!stats.isDirectory()) {
      console.error(`Error: ${scanPath} is not a directory`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error: Cannot access path ${scanPath}:`, error);
    process.exit(1);
  }
}
