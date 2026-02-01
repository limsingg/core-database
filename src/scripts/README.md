# Database Scripts

## Migration Discovery System

The database package includes a migration discovery system that automatically finds and runs migrations from all packages in the monorepo.

### How It Works

1. **Each package has its own migrations**: Place migration files in `packages/{package-name}/src/migrations/`
2. **Automatic discovery**: The `discover-migrations.js` script scans all packages for migrations
3. **Unified execution**: The `run-migrations.js` script runs all discovered migrations in timestamp order

### Migration File Naming

Migrations must follow this naming convention:
```
YYYYMMDDHHMMSS-description.js
```

Example:
```
20240201000000-create-audit-logs.js
20240201120000-add-user-indexes.js
```

The timestamp ensures migrations run in the correct order across all packages.

### Usage

#### Discover Migrations

```bash
npm run migrate:discover
```

This will list all discovered migrations grouped by package.

#### Run Migrations

```bash
# Run all pending migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Check migration status
npm run migrate:status
```

#### From Root

```bash
# Run all migrations from root
npm run migrate

# Or directly
cd packages/database
npm run migrate
```

### Adding Migrations to a Package

1. Create `src/migrations/` directory in your package (if it doesn't exist)
2. Add migration files with timestamp prefix:
   ```bash
   # Example: packages/audit/src/migrations/20240201000000-create-audit-logs.js
   ```
3. Run `npm run migrate` from the database package (or root)

### Migration Structure

Each migration file should export `up` and `down` functions:

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Migration logic
  },

  async down(queryInterface, Sequelize) {
    // Rollback logic
  },
};
```

### Examples

**Package: `@core/audit`**
- Migrations: `packages/audit/src/migrations/20240201000000-create-audit-logs.js`

**Package: `@core/auth`**
- Migrations: `packages/auth/src/migrations/20240202000000-create-users.js`

**Package: `@core/billing`**
- Migrations: `packages/billing/src/migrations/20240203000000-create-subscriptions.js`

All migrations will be discovered and run in timestamp order, regardless of which package they belong to.

### Benefits

- ✅ **Package ownership**: Each package manages its own migrations
- ✅ **Automatic discovery**: No need to manually register migrations
- ✅ **Unified execution**: One command runs all migrations
- ✅ **Proper ordering**: Migrations run in timestamp order across packages
- ✅ **Monorepo-friendly**: Works seamlessly in a monorepo structure
