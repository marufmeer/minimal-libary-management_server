"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "copies must me a positive number"]
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
});
exports.Book = (0, mongoose_1.model)("Book", BookSchema);
