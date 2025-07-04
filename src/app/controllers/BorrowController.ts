import  express, { Request, Response }  from "express"
import { ZodBorrowSchema } from "../ZodSchema/BorrowZodSchema"
import { Borrow } from "../models/BorrowModel"
export const borrowRouter=express.Router()


borrowRouter.get('/summary',async (req:Request,res:Response):Promise<any> => {
 try{
    const result=await Borrow.aggregate([
      {
        $group:{
            _id:"$bookId",
            total_quantity:{$sum:"$quantity"}
        }
      },
      {
        $lookup:{
            from:"books",
            localField:"_id",
            foreignField:"_id",
            as:"borrowSummary"
        }
      },
      {
        $unwind:"$borrowSummary"
      },
      {
        $project:{
            _id:0,
            bookId:"$_id",
            title:"$borrowSummary.title",
            isbn:"$borrowSummary.isbn",
            total_quantity:1
        }
      }
    
    ])
         if(!result){
   return res.status(404).json({
        message:"something wrong in borrow aggregation"
    })
  }
  return  res.status(200).json(result)
 
 }
 catch(error){
   return res.status(500).json({
        message:"server error",
        error
    })  
 }
})

borrowRouter.post('/create-borrow',async (req:Request,res:Response):Promise<any> => { 
const body=req.body
console.log("body",body)
const parsedData=ZodBorrowSchema .safeParse(body)
console.log(parsedData)
if(!parsedData.success){
   return  res.status(400).json({
    message:"Validation Failed",
    errors:parsedData.error.errors
   })
}

try{
    const result=await Borrow.create(parsedData.data)
  if(!result){
   return res.status(404).json({
        message:"Borrow dosen't created sucsessfully"
    })
  }
 return res.status(200).json(result)
}
catch(error){
    return res.status(500).json({
        message:"server error",
        error
    })
}
})