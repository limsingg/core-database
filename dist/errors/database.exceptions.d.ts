import { AppException } from "@core/common";
/**
 * Database-specific exceptions using error codes.
 * All exceptions use AppException with standardized error codes and messages.
 */
export declare class DatabaseException {
    /**
     * Record not found (404)
     */
    static recordNotFound(message?: string): AppException;
    /**
     * Transaction failed (500)
     */
    static transactionFailed(message?: string, details?: unknown): AppException;
    /**
     * Transaction timeout (504)
     */
    static transactionTimeout(message?: string): AppException;
    /**
     * Connection failed (503)
     */
    static connectionFailed(message?: string, details?: unknown): AppException;
    /**
     * Connection timeout (504)
     */
    static connectionTimeout(message?: string): AppException;
    /**
     * Query failed (500)
     */
    static queryFailed(message?: string, details?: unknown): AppException;
    /**
     * Invalid query (400)
     */
    static invalidQuery(message?: string, details?: unknown): AppException;
    /**
     * Unique constraint violation (409)
     */
    static uniqueConstraintViolation(message?: string, details?: unknown): AppException;
    /**
     * Foreign key constraint violation (409)
     */
    static foreignKeyConstraintViolation(message?: string, details?: unknown): AppException;
    /**
     * Migration failed (500)
     */
    static migrationFailed(message?: string, details?: unknown): AppException;
    /**
     * Migration pending (503)
     */
    static migrationPending(message?: string): AppException;
}
//# sourceMappingURL=database.exceptions.d.ts.map