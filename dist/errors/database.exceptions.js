"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@saas/common");
const database_error_codes_1 = require("./database-error-codes");
const database_error_messages_1 = require("./database-error-messages");
/**
 * Database-specific exceptions using error codes.
 * All exceptions use AppException with standardized error codes and messages.
 */
class DatabaseException {
    /**
     * Record not found (404)
     */
    static recordNotFound(message) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.RECORD_NOT_FOUND, common_1.HttpStatus.NOT_FOUND, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.RECORD_NOT_FOUND));
    }
    /**
     * Transaction failed (500)
     */
    static transactionFailed(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.TRANSACTION_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.TRANSACTION_FAILED), details);
    }
    /**
     * Transaction timeout (504)
     */
    static transactionTimeout(message) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.TRANSACTION_TIMEOUT, common_1.HttpStatus.GATEWAY_TIMEOUT, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.TRANSACTION_TIMEOUT));
    }
    /**
     * Connection failed (503)
     */
    static connectionFailed(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.CONNECTION_FAILED, common_1.HttpStatus.SERVICE_UNAVAILABLE, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.CONNECTION_FAILED), details);
    }
    /**
     * Connection timeout (504)
     */
    static connectionTimeout(message) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.CONNECTION_TIMEOUT, common_1.HttpStatus.GATEWAY_TIMEOUT, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.CONNECTION_TIMEOUT));
    }
    /**
     * Query failed (500)
     */
    static queryFailed(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.QUERY_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.QUERY_FAILED), details);
    }
    /**
     * Invalid query (400)
     */
    static invalidQuery(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.INVALID_QUERY, common_1.HttpStatus.BAD_REQUEST, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.INVALID_QUERY), details);
    }
    /**
     * Unique constraint violation (409)
     */
    static uniqueConstraintViolation(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION, common_1.HttpStatus.CONFLICT, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION), details);
    }
    /**
     * Foreign key constraint violation (409)
     */
    static foreignKeyConstraintViolation(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION, common_1.HttpStatus.CONFLICT, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION), details);
    }
    /**
     * Migration failed (500)
     */
    static migrationFailed(message, details) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.MIGRATION_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.MIGRATION_FAILED), details);
    }
    /**
     * Migration pending (503)
     */
    static migrationPending(message) {
        return new common_2.AppException(database_error_codes_1.DatabaseErrorCode.MIGRATION_PENDING, common_1.HttpStatus.SERVICE_UNAVAILABLE, message ?? (0, database_error_messages_1.getDatabaseErrorMessage)(database_error_codes_1.DatabaseErrorCode.MIGRATION_PENDING));
    }
}
exports.DatabaseException = DatabaseException;
//# sourceMappingURL=database.exceptions.js.map