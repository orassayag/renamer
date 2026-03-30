# Instructions

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```

## Overview

The Renamer script is a Node.js tool designed to automatically rename files in bulk based on configurable patterns. It scans a specified directory (and subdirectories) for files that match specific naming patterns and renames them according to your settings.

## How It Works

The script operates on files that follow this pattern:

```
[targetName][separator][remainingFileName]
```

For example, with target name "IMG" and separator "\_":

- `IMG_photo1.jpg` → `notes-photo1.jpg`
- `IMG_vacation.png` → `notes-vacation.png`

## Configuration

All settings are configured in `src/settings/index.ts`. Edit the `SETTINGS` object to customize the behavior:

### Settings Parameters

#### `targetNames: string[]`

- **Purpose**: Array of file name prefixes to match and rename
- **Example**: `["IMG", "Screenshot", "Photo"]`
- **Validation**:
  - Must be non-empty array
  - Each element must be a non-empty string
  - Cannot contain path separators (`/` or `\`)
  - Cannot contain the separator character

#### `replaceName: string`

- **Purpose**: The new prefix to replace matched target names
- **Example**: `"notes-"`
- **Validation**:
  - Must be non-empty string
  - Cannot contain path separators (`/` or `\`)
  - Cannot contain the separator character

#### `scanPath: string`

- **Purpose**: Directory path to scan for files
- **Example**: `"C:\\Users\\Or Assayag\\Downloads"`
- **Validation**:
  - Must be a valid, accessible directory path
  - Must exist and be readable

#### `separator: string`

- **Purpose**: Single character that separates target name from the rest of filename
- **Example**: `"_"`
- **Validation**:
  - Must be exactly one character
  - Cannot be empty
  - Cannot appear in target names or replace name

#### `ignorePaths: string[]`

- **Purpose**: Array of directory names to skip during scanning
- **Example**: `["node_modules", ".git", "temp"]`
- **Validation**:
  - Must be array of strings
  - Each element must be non-empty
  - Cannot contain path separators

#### `sleepAfterMilliseconds: number`

- **Purpose**: Delay in milliseconds after each file rename operation
- **Example**: `50`
- **Validation**:
  - Must be non-negative integer
  - Should not exceed 10,000ms (10 seconds)

## Usage

## Running Scripts

### Run the Rename Script

1. **Configure Settings**: Edit `src/settings/index.ts` with your desired parameters
2. **Run the Script**:
   ```bash
   pnpm start
   ```

### Build the Project

Compiles TypeScript to JavaScript:
```bash
pnpm build
```

### Lint the Code

Checks code for linting errors:
```bash
pnpm lint
```

### Development Mode

Run with watch mode for development:
```bash
pnpm dev
```

### Example Configuration

```typescript
export const SETTINGS: Settings = {
  targetNames: ['IMG', 'Screenshot', 'Photo'],
  replaceName: 'notes-',
  scanPath: 'C:\\Users\\Username\\Downloads',
  separator: '_',
  ignorePaths: ['node_modules', '.git', 'temp'],
  sleepAfterMilliseconds: 50,
};
```

## Script Behavior

### Pre-execution Validation

Before processing files, the script validates all settings:

- Checks data types and required values
- Validates file system access to scan path
- Ensures no conflicts between separator and names
- Validates numeric ranges for sleep duration

### File Processing

1. **Directory Scanning**: Recursively scans the specified directory
2. **Pattern Matching**: Identifies files matching `[targetName][separator][...]` pattern
3. **File Renaming**: Renames matched files to `[replaceName][separator][...]`
4. **Logging**: Provides detailed console output of all operations
5. **Error Handling**: Continues processing even if individual files fail

### Output Examples

```
File Rename Script
===================
Target names: ["IMG", "Screenshot"]
Replace name: "notes-"
Scan path: "C:\Users\Username\Downloads"
Separator: "_"
Ignore paths: ["temp"]
Sleep after rename: 50ms
===================

===Validate Settings===
✓ Settings validation passed
===Scan And Rename===
⊘ Separator not exists in file name, skipping...
✓ Renamed: IMG_photo1.jpg → notes-photo1.jpg (Number 1)
✓ Renamed: Screenshot_2023.png → notes-2023.png (Number 2)
⊘ Skipping ignored directory: C:\Users\Username\Downloads\temp

===================
✓ Scan complete! 2 file(s) renamed
```

## Error Handling

The script includes comprehensive error handling:

### Validation Errors

- **Invalid Settings**: Throws specific errors for each invalid parameter
- **Path Access**: Validates directory existence and permissions
- **Type Checking**: Ensures all parameters have correct data types

### Runtime Errors

- **File Access**: Continues processing if individual files cannot be renamed
- **Permission Issues**: Logs errors but doesn't stop execution
- **Invalid Paths**: Skips inaccessible directories gracefully

### Common Error Messages

- `Invalid settings: targetNames cannot be empty`
- `Invalid settings: scanPath "path" exists but is not a directory`
- `Invalid settings: separator must be a single character`
- `Error scanning directory: [error details]`
- `Failed to rename [filename]: [error details]`

## Best Practices

### Before Running

1. **Backup Important Files**: Always backup directories before bulk renaming
2. **Test with Small Directory**: Test settings with a small directory first
3. **Check Paths**: Verify scan path is correct and accessible
4. **Review Settings**: Double-check all configuration parameters

### Configuration Tips

1. **Unique Separators**: Use uncommon characters as separators to avoid conflicts
2. **Reasonable Sleep Duration**: Use 50-100ms sleep to avoid overwhelming the file system
3. **Specific Target Names**: Use specific target names to avoid unintended matches
4. **Ignore System Directories**: Always ignore system directories like `node_modules`, `.git`

### Troubleshooting

1. **Permission Denied**: Run with appropriate file system permissions
2. **Path Not Found**: Verify scan path exists and is spelled correctly
3. **No Files Renamed**: Check that target names and separators match your files
4. **Unexpected Behavior**: Review console output for detailed operation logs

## Safety Features

- **Validation First**: All settings validated before processing begins
- **Non-destructive Logging**: Detailed logging of all operations
- **Graceful Error Handling**: Continues processing despite individual failures
- **Configurable Delays**: Prevents file system overload with sleep delays
- **Path Sanitization**: Prevents path traversal issues with separator validation

## Limitations

- **Single Directory**: Processes one scan path at a time
- **Pattern-based**: Only works with files following the specified naming pattern
- **No Undo**: No built-in undo functionality (keep backups!)
- **File Extensions**: Preserves original file extensions
- **One Separator**: Uses single-character separators only

## Error Codes

All errors include a unique code (1000001-1000030) for easy troubleshooting. Error codes follow the pattern `(1000XXX)` and are included at the end of error messages.

## Development

### Building
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

### Running in Development Mode
```bash
pnpm dev
```

## Notes

- Always backup important directories before bulk operations
- Test with a small directory before processing large volumes
- The script provides detailed console output for all operations
- All settings are validated before processing begins

## Support

For issues, questions, or contributions:

- Check console output for detailed error messages
- Verify all settings are correctly configured
- Ensure file system permissions are adequate
- Test with a small directory first to validate behavior

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
