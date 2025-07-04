"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodBorrowSchema = void 0;
const zod_1 = require("zod");
exports.ZodBorrowSchema = zod_1.z.object({
    bookId: zod_1.z.string(),
    quantity: zod_1.z.number(),
    due_date: zod_1.z.string()
});
