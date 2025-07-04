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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const BookModel_1 = require("../models/BookModel");
const BookZodSchema_1 = require("../ZodSchema/BookZodSchema");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookModel_1.Book.find();
    res.send(result);
}));
exports.bookRouter.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log("body", body);
    const parsedData = BookZodSchema_1.ZodBookUpdateSchema.safeParse(body);
    console.log(parsedData);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: parsedData.error.errors
        });
    }
    try {
        const result = yield BookModel_1.Book.create(parsedData.data);
        if (!result) {
            return res.status(404).json({
                message: "Book dosen't created sucsessfully"
            });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: "server error",
            error
        });
    }
}));
exports.bookRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    console.log("body", body);
    const parsedData = BookZodSchema_1.ZodBookUpdateSchema.safeParse(body);
    console.log(parsedData);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: parsedData.error.errors
        });
    }
    try {
        const result = yield BookModel_1.Book.findByIdAndUpdate(id, parsedData.data, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: "server error",
            error
        });
    }
}));
exports.bookRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({
            message: "delete id is not provided"
        });
    }
    try {
        const result = yield BookModel_1.Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                message: "Book dosen't delete sucsessfully"
            });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: "server error",
            error
        });
    }
}));
