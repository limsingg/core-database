import { DynamicModule } from "@nestjs/common";
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
    [key: string]: unknown;
}
export interface DatabaseModuleAsyncOptions {
    useFactory: (...args: unknown[]) => Promise<DatabaseModuleOptions> | DatabaseModuleOptions;
    inject?: unknown[];
    imports?: unknown[];
}
export declare class DatabaseModule {
    /**
     * Register Sequelize with configurable options. The app (API) provides the factory
     * so it controls connection settings (host, port, credentials, dialect, etc.).
     * Set DB_ENABLED=false in env to skip this module.
     */
    static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule;
}
//# sourceMappingURL=database.module.d.ts.map