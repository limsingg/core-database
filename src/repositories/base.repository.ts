import { Model, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from "sequelize";
import { DatabaseException } from "../errors/database.exceptions";

/**
 * Base repository for database operations.
 * Provides common CRUD operations and transaction support.
 * 
 * @template T - The Sequelize model type
 */
export abstract class BaseRepository<T extends Model> {
  constructor(protected readonly model: typeof Model & { new (): T }) {}

  /**
   * Find a single record by primary key
   */
  async findById(id: string | number, options?: FindOptions): Promise<T | null> {
    return (await this.model.findByPk(id, options)) as T | null;
  }

  /**
   * Find a single record matching the criteria
   */
  async findOne(options?: FindOptions): Promise<T | null> {
    return (await this.model.findOne(options)) as T | null;
  }

  /**
   * Find all records matching the criteria
   */
  async findAll(options?: FindOptions): Promise<T[]> {
    return (await this.model.findAll(options)) as T[];
  }

  /**
   * Count records matching the criteria
   */
  async count(options?: FindOptions): Promise<number> {
    return this.model.count(options);
  }

  /**
   * Create a new record
   */
  async create(values: Partial<T>, options?: CreateOptions): Promise<T> {
    return (await this.model.create(values as any, options)) as T;
  }

  /**
   * Bulk create records
   */
  async bulkCreate(records: Partial<T>[], options?: CreateOptions): Promise<T[]> {
    return (await this.model.bulkCreate(records as any[], options)) as T[];
  }

  /**
   * Update records matching the criteria
   */
  async update(values: Partial<T>, options: UpdateOptions): Promise<[number, T[]]> {
    const result = await this.model.update(values as any, options);
    // Extract where and transaction from options for findAll
    const { where, transaction, logging } = options;
    const updated = await this.model.findAll({
      where,
      transaction,
      logging,
    });
    return [result[0], updated as T[]];
  }

  /**
   * Update a single record by primary key
   * @param id - Primary key of the record to update
   * @param values - Values to update
   * @param options - Optional Sequelize update options (supports transaction)
   * @returns Updated record
   */
  async updateById(id: string | number, values: Partial<T>, options?: Omit<UpdateOptions, "where">): Promise<T> {
    const [affectedCount] = await this.model.update(values as any, {
      where: { id } as any,
      ...options,
    });
    
    if (affectedCount === 0) {
      throw DatabaseException.recordNotFound(`Record with id ${id} not found`);
    }
    
    // Pass transaction to findByPk if provided in options
    const findOptions: FindOptions = {};
    if (options?.transaction) {
      findOptions.transaction = options.transaction;
    }
    return (await this.model.findByPk(id, findOptions)) as T;
  }

  /**
   * Delete records matching the criteria
   */
  async delete(options: DestroyOptions): Promise<number> {
    return this.model.destroy(options);
  }

  /**
   * Delete a single record by primary key
   */
  async deleteById(id: string | number, options?: Omit<DestroyOptions, "where">): Promise<number> {
    return this.model.destroy({
      where: { id } as any,
      ...options,
    });
  }

  /**
   * Check if a record exists
   */
  async exists(options?: FindOptions): Promise<boolean> {
    const count = await this.model.count(options);
    return count > 0;
  }

  /**
   * Get the Sequelize model instance (for advanced operations)
   */
  getModel(): typeof Model & { new (): T } {
    return this.model;
  }
}
