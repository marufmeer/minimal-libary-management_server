import { Types } from "mongoose";
import { z } from "zod";


export const ZodBorrowSchema=z.object({
    bookId:z.string(),
    quantity:z.number(),
    due_date:z.string()
})