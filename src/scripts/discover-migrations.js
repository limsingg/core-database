const fs = require('fs');
const path = require('path');

/**
 * Discovers all migration files from all packages in the monorepo.
 * Scans packages/*/src/migrations for migration files and returns them sorted by timestamp.
 * 
 * @returns {Array<{file: string, package: string, timestamp: string}>} Array of migration files with metadata
 */
function discoverMigrations() {
  const packagesDir = path.resolve(__dirname, '../../../packages');
  const migrations = [];

  // Check if packages directory exists
  if (!fs.existsSync(packagesDir)) {
    console.warn('Warning: packages directory not found');
    return migrations;
  }

  // Scan all packages
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const pkg of packages) {
    const migrationsDir = path.join(packagesDir, pkg, 'src', 'migrations');
    
    if (fs.existsSync(migrationsDir)) {
      const files = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
        .map(file => {
          // Extract timestamp from filename (format: YYYYMMDDHHMMSS-description.js)
          const match = file.match(/^(\d{14})-/);
          const timestamp = match ? match[1] : '00000000000000';
          
          return {
            file: path.join(migrationsDir, file),
            package: pkg,
            timestamp,
            filename: file,
          };
        });

      migrations.push(...files);
    }
  }

  // Sort by timestamp (oldest first)
  migrations.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return migrations;
}

/**
 * Gets all migration file paths as a single array (for Sequelize CLI).
 * 
 * @returns {string[]} Array of absolute paths to migration files
 */
function getMigrationPaths() {
  const migrations = discoverMigrations();
  return migrations.map(m => m.file);
}

/**
 * Gets migration paths grouped by package (for reporting).
 * 
 * @returns {Object<string, string[]>} Object mapping package names to their migration files
 */
function getMigrationsByPackage() {
  const migrations = discoverMigrations();
  const byPackage = {};

  for (const migration of migrations) {
    if (!byPackage[migration.package]) {
      byPackage[migration.package] = [];
    }
    byPackage[migration.package].push(migration.filename);
  }

  return byPackage;
}

if (require.main === module) {
  // If run directly, print discovered migrations
  const migrations = discoverMigrations();
  const byPackage = getMigrationsByPackage();

  console.log('Discovered migrations:\n');
  
  if (migrations.length === 0) {
    console.log('  No migrations found.');
  } else {
    for (const [pkg, files] of Object.entries(byPackage)) {
      console.log(`  ${pkg}:`);
      files.forEach(file => console.log(`    - ${file}`));
    }
    console.log(`\nTotal: ${migrations.length} migration(s)`);
  }
}

module.exports = {
  discoverMigrations,
  getMigrationPaths,
  getMigrationsByPackage,
};
