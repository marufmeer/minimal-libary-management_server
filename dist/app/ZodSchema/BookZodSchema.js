"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodBookUpdateSchema = exports.ZodBookSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ZodBookSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, "title is required"),
    author: zod_1.default.string().min(1, "author is required"),
    genre: zod_1.default.string().min(1, "genre is required"),
    isbn: zod_1.default.string().min(1, "isbn is required"),
    description: zod_1.default.string().min(1, "description is required"),
    copies: zod_1.default.number().min(0, "copies is must be positive"),
    available: zod_1.default.boolean().default(true)
});
exports.ZodBookUpdateSchema = exports.ZodBookSchema.partial();
