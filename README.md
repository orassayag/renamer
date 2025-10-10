# Renamer

A powerful Node.js script for bulk file renaming with pattern-based matching and comprehensive validation.

## 🚀 Features

- **Pattern-based Renaming**: Automatically rename files based on configurable naming patterns
- **Recursive Directory Scanning**: Process entire directory trees with subdirectory support
- **Comprehensive Validation**: Full settings validation with specific error messages
- **Flexible Configuration**: Customizable target names, separators, and replacement patterns
- **Safe Operation**: Built-in safeguards and detailed logging
- **Error Resilience**: Continues processing despite individual file failures
- **TypeScript**: Fully typed with comprehensive type definitions

## 📋 Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/orassayag/renamer.git
   cd renamer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure settings** in `src/settings/index.ts`:

   ```typescript
   export const SETTINGS: Settings = {
     targetNames: ['IMG', 'Screenshot'],
     replaceName: 'notes-',
     scanPath: 'C:\\Users\\Username\\Downloads',
     separator: '_',
     ignorePaths: ['node_modules', '.git'],
     sleepAfterMilliseconds: 50,
   };
   ```

4. **Run the script**:
   ```bash
   npm start
   ```

## 🎯 How It Works

The script renames files that match the pattern:

```
[targetName][separator][remainingFileName]
```

**Example**: Files like `IMG_photo1.jpg` become `notes-photo1.jpg`

### Before & After

```
Before:
├── IMG_photo1.jpg
├── Screenshot_2023.png
├── IMG_vacation.jpg
└── document.pdf

After (with targetNames: ["IMG", "Screenshot"], replaceName: "notes-"):
├── notes-photo1.jpg
├── notes-2023.png
├── notes-vacation.jpg
└── document.pdf (unchanged - doesn't match pattern)
```

## ⚙️ Configuration

| Parameter                | Type       | Description                  | Example                            |
| ------------------------ | ---------- | ---------------------------- | ---------------------------------- |
| `targetNames`            | `string[]` | File prefixes to match       | `["IMG", "Screenshot"]`            |
| `replaceName`            | `string`   | New prefix for renamed files | `"notes-"`                         |
| `scanPath`               | `string`   | Directory to scan            | `"C:\\Users\\Username\\Downloads"` |
| `separator`              | `string`   | Single character separator   | `"_"`                              |
| `ignorePaths`            | `string[]` | Directories to skip          | `["node_modules", ".git"]`         |
| `sleepAfterMilliseconds` | `number`   | Delay between operations     | `50`                               |

## 📖 Documentation

- **[INSTRUCTIONS.md](INSTRUCTIONS.md)**: Comprehensive usage guide and configuration details
- **Type Definitions**: Full TypeScript support with `src/types/settings.ts`
- **Code Documentation**: Inline JSDoc comments throughout the codebase

## 🛠️ Scripts

```bash
# Run the rename script
npm start

# Lint the codebase
npm run lint
```

## 📁 Project Structure

```
src/
├── logic/
│   ├── processFile.ts          # Individual file processing logic
│   ├── scanAndRenameFiles.ts   # Directory scanning and recursion
│   └── validateSettings.ts     # Comprehensive settings validation
├── scripts/
│   └── renameScript.ts         # Main execution script
├── settings/
│   └── index.ts                # Configuration settings
├── types/
│   ├── settings.ts             # TypeScript type definitions
│   └── index.ts                # Type exports
└── utils/
    ├── shouldIgnorePath.ts     # Path filtering utilities
    ├── sleep.ts                # Async delay utility
    └── index.ts                # Utility exports
```

## 🔒 Safety Features

- **Pre-execution Validation**: All settings validated before processing
- **Detailed Logging**: Comprehensive operation logs and error reporting
- **Error Resilience**: Continues processing despite individual file failures
- **Path Sanitization**: Prevents path traversal vulnerabilities
- **Configurable Delays**: Prevents file system overload

## ⚠️ Important Notes

- **Backup First**: Always backup important directories before bulk operations
- **Test Small**: Test with a small directory before processing large volumes
- **No Undo**: The script doesn't provide undo functionality - keep backups!
- **Pattern Matching**: Only processes files matching the exact naming pattern

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot access scanPath"**: Verify the directory exists and you have read permissions
2. **"No files renamed"**: Check that your target names and separators match existing files
3. **"Permission denied"**: Ensure you have write permissions in the target directory

### Error Messages

The script provides specific error messages for common issues:

- Invalid settings with detailed parameter validation
- File system access problems
- Type checking errors
- Path validation failures

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Or Assayag** - [GitHub](https://github.com/orassayag) - [Email](mailto:orassayag@gmail.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Keywords

- `file` - File operations and management
- `files` - Multiple file processing
- `rename` - Bulk renaming functionality
- `bulk` - Batch processing capabilities

---

**⚡ Fast, Safe, and Reliable Bulk File Renaming**
