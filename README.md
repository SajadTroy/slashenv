# slashenv

[![npm version](https://img.shields.io/npm/v/slashenv.svg)](https://www.npmjs.com/package/slashenv)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, fail-fast environment enforcer. `slashenv` validates your active environment variables (`process.env`) against a schema file on boot. 

If a required variable is missing, or if it's the wrong type (e.g., `PORT` is a string instead of a number), it instantly crashes your application with a beautiful, color-coded error message, saving you from silent production outages.

## The Problem
`dotenv` is great for loading variables, but it doesn't enforce them. You might deploy an app to production but forget to add the new `OPENAI_API_KEY` to the server. The app boots up fine, but crashes 20 minutes later when a user clicks a specific button.

## The Solution
`slashenv` compares the active environment variables against your `.env` or `.env.example` file the exact moment your application starts. If anything is missing, it fails fast.

## Installation

```bash
npm install slashenv
```

*Note: You should install this as a regular dependency, not a dev dependency, so it protects your production builds.*

## Usage

Require or import `slashenv` at the very top of your application's entry point (e.g., `index.js`, `server.ts`, or `app.js`).

### CommonJS
```javascript
const slashenv = require('slashenv');

// Enforce environment variables before booting the app
slashenv({ strict: true, schemaPath: '.env.example' });

console.log("App booted successfully! All variables are present.");
```

### ES Modules / TypeScript
```typescript
import slashenv from 'slashenv';

slashenv({ strict: true, schemaPath: '.env' });
```

## Options

You can customize `slashenv` by passing an options object:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `strict` | `boolean` | `true` | If `true`, instantly crashes the app (`process.exit(1)`) when validation fails. If `false`, it will only log the errors to the console. |
| `schemaPath` | `string` | `'.env'` | The relative path to the file you want to use as your schema (e.g., `'.env.example'`, `'.env.schema'`). |

## How it works

1. It reads your schema file (e.g., `.env`).
2. It strips out comments and empty lines.
3. It checks `process.env` to ensure every key in the schema exists and isn't empty.
4. **Type Inference:** If your schema has a number (e.g., `PORT=3000`), `slashenv` will ensure the active environment variable is also a valid number.
5. If errors are found, it logs them clearly and exits the process (if `strict` is true).

## License

MIT License. Copyright (c) 2026 Sajad Troy.