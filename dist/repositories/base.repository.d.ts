import { Model, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from "sequelize";
/**
 * Base repository for database operations.
 * Provides common CRUD operations and transaction support.
 *
 * @template T - The Sequelize model type
 */
export declare abstract class BaseRepository<T extends Model> {
    protected readonly model: typeof Model & {
        new (): T;
    };
    constructor(model: typeof Model & {
        new (): T;
    });
    /**
     * Find a single record by primary key
     */
    findById(id: string | number, options?: FindOptions): Promise<T | null>;
    /**
     * Find a single record matching the criteria
     */
    findOne(options?: FindOptions): Promise<T | null>;
    /**
     * Find all records matching the criteria
     */
    findAll(options?: FindOptions): Promise<T[]>;
    /**
     * Count records matching the criteria
     */
    count(options?: FindOptions): Promise<number>;
    /**
     * Create a new record
     */
    create(values: Partial<T>, options?: CreateOptions): Promise<T>;
    /**
     * Bulk create records
     */
    bulkCreate(records: Partial<T>[], options?: CreateOptions): Promise<T[]>;
    /**
     * Update records matching the criteria
     */
    update(values: Partial<T>, options: UpdateOptions): Promise<[number, T[]]>;
    /**
     * Update a single record by primary key
     */
    updateById(id: string | number, values: Partial<T>, options?: Omit<UpdateOptions, "where">): Promise<T>;
    /**
     * Delete records matching the criteria
     */
    delete(options: DestroyOptions): Promise<number>;
    /**
     * Delete a single record by primary key
     */
    deleteById(id: string | number, options?: Omit<DestroyOptions, "where">): Promise<number>;
    /**
     * Check if a record exists
     */
    exists(options?: FindOptions): Promise<boolean>;
    /**
     * Get the Sequelize model instance (for advanced operations)
     */
    getModel(): typeof Model & {
        new (): T;
    };
}
//# sourceMappingURL=base.repository.d.ts.map