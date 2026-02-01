import { HttpStatus } from "@nestjs/common";
import { AppException } from "@core/common";
import { DatabaseErrorCode } from "./database-error-codes";
import { getDatabaseErrorMessage } from "./database-error-messages";

/**
 * Database-specific exceptions using error codes.
 * All exceptions use AppException with standardized error codes and messages.
 */
export class DatabaseException {
  /**
   * Record not found (404)
   */
  static recordNotFound(message?: string): AppException {
    return new AppException(
      DatabaseErrorCode.RECORD_NOT_FOUND,
      HttpStatus.NOT_FOUND,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.RECORD_NOT_FOUND),
    );
  }

  /**
   * Transaction failed (500)
   */
  static transactionFailed(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.TRANSACTION_FAILED,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.TRANSACTION_FAILED),
      details,
    );
  }

  /**
   * Transaction timeout (504)
   */
  static transactionTimeout(message?: string): AppException {
    return new AppException(
      DatabaseErrorCode.TRANSACTION_TIMEOUT,
      HttpStatus.GATEWAY_TIMEOUT,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.TRANSACTION_TIMEOUT),
    );
  }

  /**
   * Connection failed (503)
   */
  static connectionFailed(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.CONNECTION_FAILED,
      HttpStatus.SERVICE_UNAVAILABLE,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.CONNECTION_FAILED),
      details,
    );
  }

  /**
   * Connection timeout (504)
   */
  static connectionTimeout(message?: string): AppException {
    return new AppException(
      DatabaseErrorCode.CONNECTION_TIMEOUT,
      HttpStatus.GATEWAY_TIMEOUT,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.CONNECTION_TIMEOUT),
    );
  }

  /**
   * Query failed (500)
   */
  static queryFailed(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.QUERY_FAILED,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.QUERY_FAILED),
      details,
    );
  }

  /**
   * Invalid query (400)
   */
  static invalidQuery(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.INVALID_QUERY,
      HttpStatus.BAD_REQUEST,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.INVALID_QUERY),
      details,
    );
  }

  /**
   * Unique constraint violation (409)
   */
  static uniqueConstraintViolation(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION,
      HttpStatus.CONFLICT,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION),
      details,
    );
  }

  /**
   * Foreign key constraint violation (409)
   */
  static foreignKeyConstraintViolation(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION,
      HttpStatus.CONFLICT,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION),
      details,
    );
  }

  /**
   * Migration failed (500)
   */
  static migrationFailed(message?: string, details?: unknown): AppException {
    return new AppException(
      DatabaseErrorCode.MIGRATION_FAILED,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.MIGRATION_FAILED),
      details,
    );
  }

  /**
   * Migration pending (503)
   */
  static migrationPending(message?: string): AppException {
    return new AppException(
      DatabaseErrorCode.MIGRATION_PENDING,
      HttpStatus.SERVICE_UNAVAILABLE,
      message ?? getDatabaseErrorMessage(DatabaseErrorCode.MIGRATION_PENDING),
    );
  }
}
