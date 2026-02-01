#!/usr/bin/env node

/**
 * Unified migration runner that discovers and runs migrations from all packages.
 * 
 * This script:
 * 1. Discovers all migrations from packages/*/src/migrations
 * 2. Sorts them by timestamp
 * 3. Runs them using Sequelize CLI
 * 
 * Usage:
 *   node run-migrations.js [sequelize-cli-args...]
 * 
 * Examples:
 *   node run-migrations.js db:migrate
 *   node run-migrations.js db:migrate:undo
 *   node run-migrations.js db:migrate:status
 */

const path = require('path');
const { spawn } = require('child_process');
const { discoverMigrations } = require('./discover-migrations');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../../../api/.env') });
require('dotenv').config({ path: path.resolve(process.cwd(), 'packages/api/.env') });
require('dotenv').config();

function runMigrations(command = 'db:migrate', args = []) {
  const migrations = discoverMigrations();
  
  if (migrations.length === 0) {
    console.log('No migrations found.');
    return;
  }

  console.log(`Found ${migrations.length} migration(s) from ${new Set(migrations.map(m => m.package)).size} package(s):\n`);
  
  const byPackage = {};
  for (const migration of migrations) {
    if (!byPackage[migration.package]) {
      byPackage[migration.package] = [];
    }
    byPackage[migration.package].push(migration.filename);
  }

  for (const [pkg, files] of Object.entries(byPackage)) {
    console.log(`  ${pkg}:`);
    files.forEach(file => console.log(`    - ${file}`));
  }
  console.log('');

  // Create a temporary directory and copy all migrations
  // This allows Sequelize CLI to see all migrations as if they were in one directory
  const tempMigrationsDir = path.join(__dirname, '../.temp-migrations');
  const fs = require('fs');

  // Clean up temp directory if it exists
  if (fs.existsSync(tempMigrationsDir)) {
    fs.rmSync(tempMigrationsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempMigrationsDir, { recursive: true });

  // Copy all migration files to temp directory
  // Use copy instead of symlink for cross-platform compatibility
  for (const migration of migrations) {
    const destPath = path.join(tempMigrationsDir, migration.filename);
    fs.copyFileSync(migration.file, destPath);
  }

  // Update .sequelizerc to use temp migrations directory
  const sequelizercPath = path.resolve(__dirname, '../../.sequelizerc');
  const originalSequelizerc = fs.readFileSync(sequelizercPath, 'utf8');
  
  // Create temporary .sequelizerc
  const tempSequelizerc = originalSequelizerc.replace(
    /'migrations-path':\s*path\.resolve\([^)]+\)/,
    `'migrations-path': path.resolve('src', '.temp-migrations')`
  );
  
  const tempSequelizercPath = path.join(__dirname, '../.temp-sequelizerc.js');
  fs.writeFileSync(tempSequelizercPath, tempSequelizerc);

  // Run Sequelize CLI
  const sequelizeCli = require.resolve('sequelize-cli/lib/sequelize');
  const sequelizeArgs = [
    command,
    ...args,
    '--config',
    path.resolve(__dirname, '../config/database.js'),
    '--migrations-path',
    tempMigrationsDir,
  ];

  console.log(`Running: sequelize-cli ${sequelizeArgs.join(' ')}\n`);

  const child = spawn('node', [sequelizeCli, ...sequelizeArgs], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../..'),
  });

  child.on('close', (code) => {
    // Cleanup
    if (fs.existsSync(tempMigrationsDir)) {
      fs.rmSync(tempMigrationsDir, { recursive: true, force: true });
    }
    if (fs.existsSync(tempSequelizercPath)) {
      fs.unlinkSync(tempSequelizercPath);
    }

    process.exit(code || 0);
  });

  child.on('error', (error) => {
    console.error('Error running migrations:', error);
    process.exit(1);
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'db:migrate';
const commandArgs = args.slice(1);

runMigrations(command, commandArgs);
