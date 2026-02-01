"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_ERROR_MESSAGES = void 0;
exports.getDatabaseErrorMessage = getDatabaseErrorMessage;
const database_error_codes_1 = require("./database-error-codes");
/**
 * Maps error codes to user-friendly error messages.
 * This centralizes all error messages for maintainability and i18n support.
 */
exports.DATABASE_ERROR_MESSAGES = {
    // Record not found errors
    [database_error_codes_1.DatabaseErrorCode.RECORD_NOT_FOUND]: "Record not found",
    // Transaction errors
    [database_error_codes_1.DatabaseErrorCode.TRANSACTION_FAILED]: "Database transaction failed",
    [database_error_codes_1.DatabaseErrorCode.TRANSACTION_TIMEOUT]: "Database transaction timed out",
    // Connection errors
    [database_error_codes_1.DatabaseErrorCode.CONNECTION_FAILED]: "Database connection failed",
    [database_error_codes_1.DatabaseErrorCode.CONNECTION_TIMEOUT]: "Database connection timed out",
    // Query errors
    [database_error_codes_1.DatabaseErrorCode.QUERY_FAILED]: "Database query failed",
    [database_error_codes_1.DatabaseErrorCode.INVALID_QUERY]: "Invalid database query",
    // Constraint errors
    [database_error_codes_1.DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION]: "Unique constraint violation",
    [database_error_codes_1.DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION]: "Foreign key constraint violation",
    // Migration errors
    [database_error_codes_1.DatabaseErrorCode.MIGRATION_FAILED]: "Database migration failed",
    [database_error_codes_1.DatabaseErrorCode.MIGRATION_PENDING]: "Database migration pending",
};
/**
 * Get error message for a given error code.
 * Falls back to the error code if message not found.
 */
function getDatabaseErrorMessage(code) {
    return exports.DATABASE_ERROR_MESSAGES[code] ?? code;
}
//# sourceMappingURL=database-error-messages.js.map