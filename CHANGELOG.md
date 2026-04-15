# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-15

### Added
- Initial release of `slashenv`.
- Core fail-fast environment validation logic against a schema file.
- Strict mode (`strict: true`) to instantly crash the app (`process.exit(1)`) on validation failure.
- Custom schema path configuration (`schemaPath: '.env'`).
- Missing environment variable detection.
- Type inference validation (automatically enforces number types if the schema expects a number).
- Beautiful, color-coded terminal error output using `picocolors`.
- Full compatibility with both CommonJS (`require`) and ES Modules (`import`).
- Comprehensive JSDoc documentation and built-in TypeScript definitions.