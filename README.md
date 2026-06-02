# Renamer

A powerful Node.js/TypeScript utility for bulk file renaming with pattern-based matching, comprehensive validation, and safe operation features.

Built in October 2025, with TypeScript for type safety and reliability, this tool helps automate the process of renaming multiple files that follow specific naming patterns.

## Features

### Core Capabilities

- **Pattern-based Renaming**: Automatically rename files based on configurable naming patterns
- **Recursive Directory Scanning**: Process entire directory trees with subdirectory support
- **Comprehensive Validation**: Full settings validation with specific error messages and unique error codes
- **Path Filtering**: Skip specific directories like `node_modules` and `.git`
- **Configurable Delays**: Prevent file system overload with adjustable delays between operations

### Technical Excellence

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Error Handling**: Unique error codes (1000001-1000030) for easy troubleshooting
- **Safe Operation**: Built-in safeguards and pre-execution validation
- **Modular Architecture**: Separated logic for scanning, processing, and validation

### Developer Experience

- **Watch Mode**: Real-time development with `pnpm dev`
- **Code Quality**: Pre-configured ESLint and Prettier
- **Detailed Logging**: Clear console output for all operations
- **Zero Dependencies**: Minimal external dependencies for security and speed

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/orassayag/renamer.git
   cd renamer
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Build the project**:

   ```bash
   pnpm build
   ```

### Configuration

**Configure settings** in `src/settings/index.ts`:

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

### Running the Script

```bash
pnpm start
```

## Usage

To use the renamer script:

1. **Configure Settings**: Update `src/settings/index.ts` with your target patterns and scan path.
2. **Run**: Execute `pnpm start` to begin the renaming process.
3. **Monitor**: Watch the console for real-time updates and completion summary.
4. **Verify**: Check your files to ensure they were renamed as expected.

## How It Works

```mermaid
flowchart TD
    A[Start Script] --> B[Load Settings from src/settings/index.ts]
    B --> C[Validate Settings]
    C --> D{Settings Valid?}
    D -->|No| E[Throw Error with Code]
    D -->|Yes| F[Initialize Queue with scanPath]
    F --> G{Queue Empty?}
    G -->|Yes| Z[Display Results & Exit]
    G -->|No| H[Get Next Directory from Queue]
    H --> I[Read Directory Entries]
    I --> J{Entry Type?}
    J -->|Directory| K{Should Ignore?}
    K -->|Yes| L[Log Skip Message]
    K -->|No| M[Add to Queue]
    J -->|File| N[Check Pattern Match]
    N --> O{Matches Pattern?}
    O -->|No| P[Log Skip Message]
    O -->|Yes| Q[Extract Prefix & Suffix]
    Q --> R[Construct New Name]
    R --> S[Rename File]
    S --> T[Increment Counter]
    T --> U[Sleep Configured ms]
    U --> G
    L --> G
    M --> G
    P --> G

    style A fill:#e1f5e1
    style Z fill:#e1f5e1
    style E fill:#ffe1e1
    style S fill:#e1e5ff
```

## Architecture Principles

This project follows clean code and robust architecture principles:

1. **Validation First**: All settings are validated before any file operations begin.
2. **Error Resilience**: The script handles individual file errors without stopping the entire process.
3. **Type Safety**: Strict TypeScript implementation ensures data integrity.
4. **Single Responsibility**: Each module has a clear, focused purpose (scanning, processing, validation).
5. **Config-Driven**: Behavior is controlled through a centralized settings file.

## Architecture

The application is structured into logical layers:

- **Logic Layer**: Core business logic for file scanning, pattern matching, and renaming.
- **Scripts Layer**: Main execution entry point that orchestrates the process.
- **Settings Layer**: Configuration management and validation.
- **Utils Layer**: Cross-cutting utilities like delays and path filtering.
- **Types Layer**: Centralized TypeScript definitions for consistency.

## Design Patterns

- **Guard Clauses**: Extensive use of early returns for cleaner logic.
- **Functional Decomposition**: Breaking down complex tasks into small, testable functions.
- **Configuration Pattern**: Centralized settings for easy modification.
- **Asynchronous Queue**: Recursive scanning handled with async/await patterns.

### Process Flow

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

## Configuration Options

| Parameter                | Type       | Description                  | Example                            |
| ------------------------ | ---------- | ---------------------------- | ---------------------------------- |
| `targetNames`            | `string[]` | File prefixes to match       | `["IMG", "Screenshot"]`            |
| `replaceName`            | `string`   | New prefix for renamed files | `"notes-"`                         |
| `scanPath`               | `string`   | Directory to scan            | `"C:\\Users\\Username\\Downloads"` |
| `separator`              | `string`   | Single character separator   | `"_"`                              |
| `ignorePaths`            | `string[]` | Directories to skip          | `["node_modules", ".git"]`         |
| `sleepAfterMilliseconds` | `number`   | Delay between operations     | `50`                               |

## Documentation

- **[INSTRUCTIONS.md](INSTRUCTIONS.md)**: Comprehensive usage guide, configuration details, and troubleshooting
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Guidelines for contributing to the project
- **Type Definitions**: Full TypeScript support with `src/types/settings.ts`
- **Code Documentation**: Inline JSDoc comments throughout the codebase

## Available Scripts

```bash
# Run the rename script
pnpm start

# Run in development mode with watch
pnpm dev

# Build the project
pnpm build

# Lint the codebase
pnpm lint
```

## Project Structure

### Directory Structure

```
src/
├── logic/              # Business logic
│   ├── index.ts        # Logic exports
│   ├── processFile.ts  # File processing
│   ├── scanAndRenameFiles.ts # Directory scanning
│   └── validateSettings.ts # Settings validation
├── scripts/            # Entry point scripts
│   └── renameScript.ts # Main execution script
├── settings/           # Configuration
│   └── index.ts        # Settings definition
├── types/              # Type definitions
│   ├── index.ts        # Type exports
│   └── settings.ts     # Settings interfaces
└── utils/              # Utilities
    ├── index.ts        # Utility exports
    ├── shouldIgnorePath.ts # Filtering logic
    └── sleep.ts        # Async delays
```

## Safety Features

- **Pre-execution Validation**: All settings validated before processing
- **Detailed Logging**: Comprehensive operation logs and error reporting
- **Error Resilience**: Continues processing despite individual file failures
- **Path Sanitization**: Prevents path traversal vulnerabilities
- **Configurable Delays**: Prevents file system overload

## Important Notes

- **Backup First**: Always backup important directories before bulk operations
- **Test Small**: Test with a small directory before processing large volumes
- **No Undo**: The script doesn't provide undo functionality - keep backups!
- **Pattern Matching**: Only processes files matching the exact naming pattern

## Best Practices

- **Backup First**: Always backup important directories before bulk operations.
- **Test Small**: Test your settings with a small directory before processing large volumes.
- **Check Paths**: Verify that your scan path is correct and accessible.
- **Review Settings**: Double-check all configuration parameters before running.
- **Use Unique Separators**: Use uncommon characters as separators to avoid unintended matches.

## Troubleshooting

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

## Support

For issues, questions, or contributions:

- Check console output for detailed error messages
- Verify all settings are correctly configured
- Ensure file system permissions are adequate
- Open an issue on GitHub for bug reports or feature requests
- Contact the author via email or LinkedIn

## Error Codes

The script provides unique error codes (1000001-1000030) for all validation and runtime errors. Each error code follows the pattern `(1000XXX)` and appears at the end of error messages for easy troubleshooting and debugging.

## Development

The project uses:

- **TypeScript** for type safety and better developer experience
- **pnpm** for fast, efficient package management
- **ESLint** for code linting and quality checks
- **Prettier** for consistent code formatting
- **tsx** for running TypeScript directly without compilation

## License

This application has an MIT license - see the [LICENSE](LICENSE) file for details.

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag

## Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute. Contributing doesn't just mean submitting pull requests—there are many different ways to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Keywords

- `file` - File operations and management
- `files` - Multiple file processing
- `rename` - Bulk renaming functionality
- `bulk` - Batch processing capabilities
- `typescript` - TypeScript implementation
- `node` - Node.js runtime
- `pattern-matching` - Pattern-based file identification

---

**Fast, Safe, and Reliable Bulk File Renaming with TypeScript**

## Acknowledgments

- Built for educational and research purposes
- Respects robots.txt and implements rate limiting
- Uses user-agent rotation to avoid detection
- Implements polite crawling practices
