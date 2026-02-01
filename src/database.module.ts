import { DynamicModule, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TransactionService } from "./transactions";

/**
 * Options for DatabaseModule.forRootAsync.
 * Pass any Sequelize config (dialect, host, port, username, password, database, etc.).
 */
export interface DatabaseModuleOptions {
  dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging?: boolean | ((sql: string, timing?: number) => void);
  autoLoadModels?: boolean;
  synchronize?: boolean;
  // Add other Sequelize options as needed
  [key: string]: unknown;
}

export interface DatabaseModuleAsyncOptions {
  useFactory: (
    ...args: unknown[]
  ) => Promise<DatabaseModuleOptions> | DatabaseModuleOptions;
  inject?: unknown[];
  imports?: unknown[];
}

@Module({})
export class DatabaseModule {
  /**
   * Register Sequelize with configurable options. The app (API) provides the factory
   * so it controls connection settings (host, port, credentials, dialect, etc.).
   * Set DB_ENABLED=false in env to skip this module.
   */
  static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ...(options.imports ?? []),
        SequelizeModule.forRootAsync({
          imports: options.imports ?? [],
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        }),
      ],
      providers: [TransactionService],
      exports: [TransactionService],
    };
  }
}
