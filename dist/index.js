"use strict";
/**
 * @saas/database — Database library
 * Sequelize, migrations, base repos, tenant-scoping, transactions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
__exportStar(require("./database.module"), exports);
__exportStar(require("./repositories"), exports);
__exportStar(require("./transactions"), exports);
var transactions_1 = require("./transactions");
Object.defineProperty(exports, "TransactionService", { enumerable: true, get: function () { return transactions_1.TransactionService; } });
__exportStar(require("./errors"), exports);
//# sourceMappingURL=index.js.map