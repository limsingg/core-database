import { Sequelize, Transaction } from "sequelize";
/**
 * Transaction service for managing database transactions.
 * Inject this service to use transactions in your repositories.
 */
export declare class TransactionService {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    /**
     * Run a function within a database transaction.
     * Automatically commits on success or rolls back on error.
     *
     * @param fn - Function to execute within transaction
     * @returns Promise with the result of the function
     */
    runInTransaction<T>(fn: (transaction: Transaction) => Promise<T>): Promise<T>;
}
/**
 * Standalone function to run a transaction.
 * Requires Sequelize instance to be injected via TransactionService.
 *
 * @deprecated Use TransactionService.runInTransaction() instead
 */
export declare function runInTransaction<T>(sequelize: Sequelize, fn: (transaction: Transaction) => Promise<T>): Promise<T>;
//# sourceMappingURL=transactions.d.ts.map