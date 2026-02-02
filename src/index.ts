/**
 * @core/database — Database library
 * Sequelize, migrations, base repos, tenant-scoping, transactions
 */

export * from "./database.module";
export type {
  DatabaseModuleOptions,
  DatabaseModuleAsyncOptions,
} from "./database.module";
export * from "./repositories";
export * from "./transactions";
export { TransactionService } from "./transactions";
export * from "./errors";