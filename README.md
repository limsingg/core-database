# @core/database

Sequelize + MySQL, migrations, base repositories, tenant-scoping, soft delete, transactions.

## Role

ORM and data access layer. All tenant-scoped and base CRUD patterns live here.

## Scope

| Area         | Deliverables                                            |
| ------------ | ------------------------------------------------------- |
| ORM          | SequelizeModule, MySQL dialect, config from env         |
| Schema       | Base model (timestamps, paranoid/soft delete)           |
| Migrations   | Sequelize CLI, TypeScript migrations                    |
| Repositories | `BaseRepository<T>`, CRUD, tenant filter                |
| Tenant scope | `tenantId` on models, scope mixin, `setTenantContext()` |
| Transactions | `runInTransaction(fn)` helper                           |
| Seeding      | Seed runner script                                      |

## Exports (as implemented)

- `DatabaseModule` (`forRoot` / `forRootAsync`)
- `BaseModel`, `BaseRepository<T>`
- `TenantScopedModel`, tenant scope mixin
- `runInTransaction()`, `getConnection()`
- Migration and seed scripts

## Dependencies

- `@nestjs/sequelize`, `sequelize`, `sequelize-typescript`, `mysql2`
- **Peer:** `@core/common`

## Usage

```ts
import { DatabaseModule } from "@core/database";

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        dialect: "mysql",
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT"),
        username: config.get("DB_USER"),
        password: config.get("DB_PASSWORD"),
        database: config.get("DB_NAME"),
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Example: base repository and transaction

Use `BaseRepository` for CRUD and `runInTransaction` when you need atomicity:

```ts
import { Injectable } from "@nestjs/common";
import { BaseRepository, runInTransaction } from "@core/database";
import { MyModel } from "./my.model";

@Injectable()
export class MyService {
  constructor(private readonly repo: BaseRepository<MyModel>) {}

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async createWithAudit(dto: CreateDto) {
    return runInTransaction(async (tx) => {
      const entity = await this.repo.create(dto, { transaction: tx });
      await this.audit.log(
        "entity.created",
        "my-resource",
        entity.id,
        { dto },
        tx,
      );
      return entity;
    });
  }
}
```

## Extending / customizing

**Best practice:** Extend `BaseRepository` (or the tenant-scoped variant) for your model and add domain methods. Keep migrations and base types in the package; add new models/migrations in your app or a dedicated package.

- **Custom repository** — Extend `BaseRepository<YourModel>` and add methods (e.g. `findBySlug`, `findActive`):

```ts
// In your app (e.g. src/projects/project.repository.ts)
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@core/database";
import { Project } from "./project.model";

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  async findBySlug(tenantId: string, slug: string) {
    return this.findOne({ where: { tenantId, slug } });
  }

  async findActive(tenantId: string) {
    return this.findAll({ where: { tenantId, status: "active" } });
  }
}
```

Register the repository in your feature module and inject it where needed. Use the same pattern for tenant-scoped repos if you extend the package’s tenant-scoped base.

- **Custom model** — Use the package’s `BaseModel` / `TenantScopedModel` as the base class for your entities; define your table name and attributes. Don’t modify the package’s base model itself.

See **DESIGN.md** and **IMPLEMENTATION_ORDER.md** in the repo root.

## Scripts

- `npm run migrate` — run all migrations from all packages (discovers automatically)
- `npm run migrate:undo` — undo last migration
- `npm run migrate:status` — check migration status
- `npm run migrate:discover` — list all discovered migrations
- `npm run seed` — run seed script

### Migration Discovery System

The database package includes an automatic migration discovery system that finds migrations from all packages in the monorepo.

**How it works:**
- Each package can have migrations in `packages/{package-name}/src/migrations/`
- Migrations are automatically discovered and run in timestamp order
- Migration files must follow naming: `YYYYMMDDHHMMSS-description.js`

**Example:**
```bash
# Discover migrations
npm run migrate:discover

# Run all migrations
npm run migrate

# From root
npm run migrate -w packages/database
```

**See `src/scripts/README.md` for detailed migration documentation.**

See **DESIGN.md** and **IMPLEMENTATION_ORDER.md** in the repo root.
