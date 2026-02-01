"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const database_exceptions_1 = require("../errors/database.exceptions");
/**
 * Base repository for database operations.
 * Provides common CRUD operations and transaction support.
 *
 * @template T - The Sequelize model type
 */
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    /**
     * Find a single record by primary key
     */
    async findById(id, options) {
        return (await this.model.findByPk(id, options));
    }
    /**
     * Find a single record matching the criteria
     */
    async findOne(options) {
        return (await this.model.findOne(options));
    }
    /**
     * Find all records matching the criteria
     */
    async findAll(options) {
        return (await this.model.findAll(options));
    }
    /**
     * Count records matching the criteria
     */
    async count(options) {
        return this.model.count(options);
    }
    /**
     * Create a new record
     */
    async create(values, options) {
        return (await this.model.create(values, options));
    }
    /**
     * Bulk create records
     */
    async bulkCreate(records, options) {
        return (await this.model.bulkCreate(records, options));
    }
    /**
     * Update records matching the criteria
     */
    async update(values, options) {
        const result = await this.model.update(values, options);
        const updated = await this.model.findAll({ where: options.where, ...options });
        return [result[0], updated];
    }
    /**
     * Update a single record by primary key
     */
    async updateById(id, values, options) {
        const [affectedCount] = await this.model.update(values, {
            where: { id },
            ...options,
        });
        if (affectedCount === 0) {
            throw database_exceptions_1.DatabaseException.recordNotFound(`Record with id ${id} not found`);
        }
        return (await this.model.findByPk(id));
    }
    /**
     * Delete records matching the criteria
     */
    async delete(options) {
        return this.model.destroy(options);
    }
    /**
     * Delete a single record by primary key
     */
    async deleteById(id, options) {
        return this.model.destroy({
            where: { id },
            ...options,
        });
    }
    /**
     * Check if a record exists
     */
    async exists(options) {
        const count = await this.model.count(options);
        return count > 0;
    }
    /**
     * Get the Sequelize model instance (for advanced operations)
     */
    getModel() {
        return this.model;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map