# Contributing to slashenv

First off, thank you for considering contributing to `slashenv`! 

## Local Development Setup

To get the project running locally so you can make changes:

1. **Fork the repository** to your own GitHub account.
2. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/SajadTroy/slashenv.git
   cd slashenv
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Make your changes** in the `src/` directory.

5. **Build the project** to compile the TypeScript files:
   ```bash
   npm run build
   ```

6. **Test your changes** by creating a local `.env` and `test.js` file, and running your built code:
   ```bash
   node test.js
   ```

## Pull Request Process

1. Ensure your code compiles without errors (`npm run build`).
2. Update the `README.md` with details of changes to the interface, if applicable.
3. Submit a Pull Request describing the problem you are solving and how your code fixes it. 

## Code of Conduct
Please be respectful, kind, and collaborative in all issues and pull requests. 