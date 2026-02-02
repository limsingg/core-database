# Error Handling in @limsingg/database

This document describes the error handling system implemented in the `@limsingg/database` package.

---

## 🎯 Design Principles

1. **Error Codes**: All errors use standardized error codes (e.g., `DATABASE_RECORD_NOT_FOUND`)
2. **Centralized Messages**: Error messages are mapped from codes, not hardcoded
3. **Consistent Structure**: All errors use `AppException` from `@limsingg/common`
4. **Reusability**: Error codes can be reused across different scenarios
5. **Type Safety**: Error codes are defined as enums for type safety

---

## 📁 File Structure

```
packages/database/src/errors/
├── database-error-codes.ts      # Error code enum definitions
├── database-error-messages.ts   # Error code → message mapping
├── database.exceptions.ts       # Exception factory methods
└── index.ts                     # Exports
```

---

## 🔢 Error Codes

All error codes follow the pattern: `DATABASE_<CATEGORY>_<DESCRIPTION>`

### Categories:

- **Record Errors**: `DATABASE_RECORD_NOT_FOUND`
- **Transaction Errors**: `DATABASE_TRANSACTION_FAILED`, `DATABASE_TRANSACTION_TIMEOUT`
- **Connection Errors**: `DATABASE_CONNECTION_FAILED`, `DATABASE_CONNECTION_TIMEOUT`
- **Query Errors**: `DATABASE_QUERY_FAILED`, `DATABASE_INVALID_QUERY`
- **Constraint Errors**: `DATABASE_UNIQUE_CONSTRAINT_VIOLATION`, `DATABASE_FOREIGN_KEY_CONSTRAINT_VIOLATION`
- **Migration Errors**: `DATABASE_MIGRATION_FAILED`, `DATABASE_MIGRATION_PENDING`

---

## 📝 Usage Examples

### In Repositories:

```typescript
import { DatabaseException } from "../errors/database.exceptions";

async updateById(id: string, values: Partial<T>): Promise<T> {
  const [affectedCount] = await this.model.update(values, { where: { id } });
  if (affectedCount === 0) {
    throw DatabaseException.recordNotFound(`Record with id ${id} not found`);
  }
  return this.model.findByPk(id);
}
```

### In Transaction Handlers:

```typescript
import { DatabaseException } from "../errors/database.exceptions";

try {
  await runInTransaction(async (tx) => {
    // operations
  });
} catch (error) {
  if (error.name === "SequelizeTimeoutError") {
    throw DatabaseException.transactionTimeout();
  }
  throw DatabaseException.transactionFailed("Transaction failed", {
    error: error.message,
  });
}
```

---

## 🔄 Error Response Format

All errors follow the `ErrorResponseDto` format from `@limsingg/common`:

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Record not found",
  "code": "DATABASE_RECORD_NOT_FOUND",
  "requestId": "req-123"
}
```

---

## ✅ Benefits

1. **Consistency**: All errors use the same structure
2. **Maintainability**: Messages are centralized and easy to update
3. **Internationalization**: Messages can be easily replaced for i18n
4. **Type Safety**: Error codes are typed, preventing typos
5. **Reusability**: Same error code can be used in multiple places
6. **Debugging**: Error codes make it easy to identify error types in logs

---

## 🔍 Error Code Reference

| Code                                        | HTTP Status | Message                          | Used When                       |
| ------------------------------------------- | ----------- | -------------------------------- | ------------------------------- |
| `DATABASE_RECORD_NOT_FOUND`                 | 404         | Record not found                 | Record lookup/update fails      |
| `DATABASE_TRANSACTION_FAILED`               | 500         | Database transaction failed      | Transaction rollback occurs     |
| `DATABASE_TRANSACTION_TIMEOUT`              | 504         | Database transaction timed out   | Transaction exceeds timeout     |
| `DATABASE_CONNECTION_FAILED`                | 503         | Database connection failed       | Cannot connect to database      |
| `DATABASE_CONNECTION_TIMEOUT`               | 504         | Database connection timed out    | Connection exceeds timeout      |
| `DATABASE_QUERY_FAILED`                     | 500         | Database query failed            | Query execution fails           |
| `DATABASE_INVALID_QUERY`                    | 400         | Invalid database query           | Query syntax/parameters invalid |
| `DATABASE_UNIQUE_CONSTRAINT_VIOLATION`      | 409         | Unique constraint violation      | Duplicate unique value          |
| `DATABASE_FOREIGN_KEY_CONSTRAINT_VIOLATION` | 409         | Foreign key constraint violation | Invalid foreign key reference   |
| `DATABASE_MIGRATION_FAILED`                 | 500         | Database migration failed        | Migration execution fails       |
| `DATABASE_MIGRATION_PENDING`                | 503         | Database migration pending       | Migrations not yet applied      |

---

## 🚀 Best Practices

1. **Always use error codes**: Never hardcode error messages
2. **Use appropriate HTTP status**: Match status code to error type
3. **Provide details when helpful**: Use `details` parameter for additional context
4. **Reuse error codes**: Don't create new codes for similar errors
5. **Document new codes**: Add new codes to this document when adding them

---

## 📦 Package Location

Error handling is implemented **within the database package** because:

1. **Domain-Specific**: Error codes are specific to database operations
2. **Encapsulation**: Keeps database-related concerns together
3. **Reusability**: Other packages can import and use database error codes if needed
4. **Independence**: Database package doesn't depend on other packages for error handling

The base `AppException` class comes from `@limsingg/common`, but all database-specific error codes and messages are defined in `@limsingg/database`.

---

## 🔄 Migration from Hardcoded Errors

**Before:**

```typescript
throw new Error(`Record with id ${id} not found`);
```

**After:**

```typescript
throw DatabaseException.recordNotFound(`Record with id ${id} not found`);
```

---

**Error handling structure ready for use!** ✅
