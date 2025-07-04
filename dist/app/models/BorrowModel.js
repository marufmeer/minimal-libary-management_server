"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const BookModel_1 = require("./BookModel");
const BorrowSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    due_date: {
        type: String,
        required: true
    }
});
BorrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield BookModel_1.Book.findById(this.bookId);
            if (!book) {
                return next(new Error("Book not found. Cannot borrow a non-existent book."));
            }
            if (this.quantity > book.copies) {
                return next(new Error("books quantity is not available you have to less the quantity."));
            }
            book.copies = book.copies - this.quantity;
            if (book.copies === 0) {
                book.available = false;
            }
            yield book.save();
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", BorrowSchema);
