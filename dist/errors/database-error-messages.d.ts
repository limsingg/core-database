import { DatabaseErrorCode } from "./database-error-codes";
/**
 * Maps error codes to user-friendly error messages.
 * This centralizes all error messages for maintainability and i18n support.
 */
export declare const DATABASE_ERROR_MESSAGES: Record<DatabaseErrorCode, string>;
/**
 * Get error message for a given error code.
 * Falls back to the error code if message not found.
 */
export declare function getDatabaseErrorMessage(code: DatabaseErrorCode): string;
//# sourceMappingURL=database-error-messages.d.ts.map