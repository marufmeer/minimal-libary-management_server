import  { CallbackError, model, Schema } from "mongoose"
import { BorrowI } from "../interfaces/BorrowInterfaces"
import { Book } from "./BookModel"
const BorrowSchema=new Schema<BorrowI>({
bookId:{
    type:Schema.Types.ObjectId,
    ref:"Book",
    required:true
},
quantity:{
    type:Number,
    required:true
},
due_date:{
    type:String,
    required:true
}
})
BorrowSchema.pre("save",async function(next){
try{
 const book=await Book.findById(this.bookId)
 if(!book){
   return next(new Error("Book not found. Cannot borrow a non-existent book."))
 }
 if(this.quantity>book.copies){
    return next(new Error("books quantity is not available you have to less the quantity."))
 }
 book.copies=book.copies-this.quantity
 if(book.copies===0){
    book.available=false
 }
 await book.save()
 next()
}
catch(error:unknown){
  next(error as CallbackError)
}
})
export const Borrow=model<BorrowI>("Borrow",BorrowSchema)