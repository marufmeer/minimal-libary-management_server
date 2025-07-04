import { Types } from "mongoose";

export interface BorrowI{
    bookId:Types.ObjectId, quantity:number, due_date:string
}