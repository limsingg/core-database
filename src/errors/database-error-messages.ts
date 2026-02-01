import { DatabaseErrorCode } from "./database-error-codes";

/**
 * Maps error codes to user-friendly error messages.
 * This centralizes all error messages for maintainability and i18n support.
 */
export const DATABASE_ERROR_MESSAGES: Record<DatabaseErrorCode, string> = {
  // Record not found errors
  [DatabaseErrorCode.RECORD_NOT_FOUND]: "Record not found",
  
  // Transaction errors
  [DatabaseErrorCode.TRANSACTION_FAILED]: "Database transaction failed",
  [DatabaseErrorCode.TRANSACTION_TIMEOUT]: "Database transaction timed out",
  
  // Connection errors
  [DatabaseErrorCode.CONNECTION_FAILED]: "Database connection failed",
  [DatabaseErrorCode.CONNECTION_TIMEOUT]: "Database connection timed out",
  
  // Query errors
  [DatabaseErrorCode.QUERY_FAILED]: "Database query failed",
  [DatabaseErrorCode.INVALID_QUERY]: "Invalid database query",
  
  // Constraint errors
  [DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION]: "Unique constraint violation",
  [DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION]: "Foreign key constraint violation",
  
  // Migration errors
  [DatabaseErrorCode.MIGRATION_FAILED]: "Database migration failed",
  [DatabaseErrorCode.MIGRATION_PENDING]: "Database migration pending",
};

/**
 * Get error message for a given error code.
 * Falls back to the error code if message not found.
 */
export function getDatabaseErrorMessage(code: DatabaseErrorCode): string {
  return DATABASE_ERROR_MESSAGES[code] ?? code;
}
