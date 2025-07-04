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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const BorrowZodSchema_1 = require("../ZodSchema/BorrowZodSchema");
const BorrowModel_1 = require("../models/BorrowModel");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.get('/summary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield BorrowModel_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    total_quantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "borrowSummary"
                }
            },
            {
                $unwind: "$borrowSummary"
            },
            {
                $project: {
                    _id: 0,
                    bookId: "$_id",
                    title: "$borrowSummary.title",
                    isbn: "$borrowSummary.isbn",
                    total_quantity: 1
                }
            }
        ]);
        if (!result) {
            return res.status(404).json({
                message: "something wrong in borrow aggregation"
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
exports.borrowRouter.post('/create-borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log("body", body);
    const parsedData = BorrowZodSchema_1.ZodBorrowSchema.safeParse(body);
    console.log(parsedData);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: parsedData.error.errors
        });
    }
    try {
        const result = yield BorrowModel_1.Borrow.create(parsedData.data);
        if (!result) {
            return res.status(404).json({
                message: "Borrow dosen't created sucsessfully"
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
