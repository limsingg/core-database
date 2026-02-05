import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize, Transaction } from "sequelize";

/**
 * Transaction service for managing database transactions.
 * Inject this service to use transactions in your repositories.
 */
@Injectable()
export class TransactionService {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  /**
   * Run a function within a database transaction.
   * Automatically commits on success or rolls back on error.
   *
   * @param fn - Function to execute within transaction
   * @returns Promise with the result of the function
   */
  async runInTransaction<T>(fn: (transaction: Transaction) => Promise<T>): Promise<T> {
    const transaction = await this.sequelize.transaction();

    try {
      const result = await fn(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

/**
 * Standalone function to run a transaction.
 * Requires Sequelize instance to be injected via TransactionService.
 *
 * @deprecated Use TransactionService.runInTransaction() instead
 */
export async function runInTransaction<T>(
  sequelize: Sequelize,
  fn: (transaction: Transaction) => Promise<T>,
): Promise<T> {
  const transaction = await sequelize.transaction();

  try {
    const result = await fn(transaction);
    await transaction.commit();
    return result;
  } catch (error: unknown) {
    await transaction.rollback();
    throw error;
  }
}
