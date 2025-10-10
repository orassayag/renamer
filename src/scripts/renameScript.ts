import { scanAndRenameFiles, validateSettings } from '../logic';
import { SETTINGS } from '../settings';

const {
  targetNames,
  replaceName,
  scanPath,
  separator,
  ignorePaths,
  sleepAfterMilliseconds,
} = SETTINGS;
/**
 * Main execution function.
 */
async function run(): Promise<void> {
  logBeforeRun();
  console.log('===Validate Settings===');
  await validateSettings(SETTINGS);
  console.log('===✓ Settings validation passed===');
  console.log('===Scan And Rename===');
  const renamedFilesCount: number = await scanAndRenameFiles(
    scanPath,
    ignorePaths
  );
  console.log('\n===================');
  console.log(`===✓ Scan complete! ${renamedFilesCount} file(s) renamed===`);
}

/**
 * Log all data before running the script.
 */
function logBeforeRun(): void {
  console.log('File Rename Script');
  console.log('===================');
  console.log(
    `Target names: [${targetNames.map((name: string) => `"${name}"`).join(', ')}]`
  );
  console.log(`Replace name: "${replaceName}"`);
  console.log(`Scan path: "${scanPath}"`);
  console.log(`Separator: "${separator}"`);
  console.log(
    `Ignore paths: [${ignorePaths.map((path: string) => `"${path}"`).join(', ')}]`
  );
  console.log(`Sleep after rename: ${sleepAfterMilliseconds}ms`);
  console.log('===================\n');
}

// Run the script.
run().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
