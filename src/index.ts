/**
 * slashenv - A zero-dependency, fail-fast environment enforcer.
 * Validates active environment variables against a schema on boot.
 * Instantly crashes the application with detailed logs if required 
 * variables are missing or of the wrong type.
 * @author SajadTroy
 * @license MIT
 * @repository https://github.com/SajadTroy/slashenv
 */

import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

/**
 * Configuration options for the slashenv enforcer.
 */
export interface SlashEnvOptions {
    /** * If true, instantly crashes the app (process.exit) when validation fails. 
     * If false, only logs the errors.
     * @default true 
     */
    strict?: boolean;

    /** * The path to your environment schema file, relative to the project root.
     * @default '.env' 
     */
    schemaPath?: string;
}

/**
 * Compares the active `process.env` against the specified schema file.
 * * @param {SlashEnvOptions} options - Configuration for strictness and schema location.
 * @returns {void}
 */
export function slashenv(options: SlashEnvOptions = { strict: true, schemaPath: '.env' }) {
    // Resolve the absolute path to the schema file
    const schemaFilePath = path.resolve(process.cwd(), options.schemaPath || '.env');

    // Gracefully handle missing schema files
    if (!fs.existsSync(schemaFilePath)) {
        console.warn(pc.yellow(`[slashenv]: Could not find schema file at ${schemaFilePath}. Skipping validation.`));
        return;
    }

    // Read the schema file contents
    const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

    // Parse the schema file into an array of keys and expected values
    const schemaVars = schemaContent
        .split('\n')
        .map(line => line.trim())
        // Ignore empty lines and comments
        .filter(line => line && !line.startsWith('#'))
        .map(line => {
            const [key, ...rest] = line.split('=');
            return { key: key.trim(), expectedValue: rest.join('=').trim() };
        });

    const errors: string[] = [];

    // Validate each variable from the schema against process.env
    for (const { key, expectedValue } of schemaVars) {
        const actualValue = process.env[key];

        // 1. Check if the variable is entirely missing or empty
        if (actualValue === undefined || actualValue === '') {
            errors.push(`${pc.bold(key)} is missing.`);
            continue;
        }

        // 2. Check for type mismatches (specifically checking for expected Numbers)
        const isExpectedNumber = expectedValue !== '' && !isNaN(Number(expectedValue));
        const isActualNumber = !isNaN(Number(actualValue));

        if (isExpectedNumber && !isActualNumber) {
            errors.push(`${pc.bold(key)} is the wrong type. Expected a number, got "${actualValue}".`);
        }
    }

    // 3. Handle failures based on strict mode configuration
    if (errors.length > 0) {
        console.error('\n' + pc.bgRed(pc.white(' 🚨 ENVIRONMENT GUARD FAILED ')));
        console.error(pc.red(`Your application is missing required configuration:`));

        // Output all gathered errors
        errors.forEach(err => console.error(`  ${err}`));

        console.error(pc.cyan(`\nPlease update your environment variables to match ${options.schemaPath}\n`));

        // Crash the application if strict mode is enabled
        if (options.strict) {
            process.exit(1);
        }
    }
}

// Support CommonJS requires
module.exports = slashenv;
module.exports.slashenv = slashenv;
module.exports.default = slashenv;