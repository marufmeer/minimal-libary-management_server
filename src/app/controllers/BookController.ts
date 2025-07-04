import  express, { Request, Response}  from "express"
import { Book } from "../models/BookModel"
import { ZodBookUpdateSchema } from "../ZodSchema/BookZodSchema"

export const bookRouter=express.Router()

bookRouter.get('/',async (req:Request,res:Response) => {
   const result=await Book.find() 
   res.send(result)
})

bookRouter.post('/create-book',async (req:Request,res:Response):Promise<any> => { 
const body=req.body
console.log("body",body)
const parsedData=ZodBookUpdateSchema.safeParse(body)
console.log(parsedData)
if(!parsedData.success){
   return  res.status(400).json({
    message:"Validation Failed",
    errors:parsedData.error.errors
   })
}

try{
    const result=await Book.create(parsedData.data)
  if(!result){
   return res.status(404).json({
        message:"Book dosen't created sucsessfully"
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
bookRouter.patch('/:id',async (req:Request,res:Response):Promise<any> => {
const id=req.params.id   
const body=req.body
console.log("body",body)
const parsedData=ZodBookUpdateSchema.safeParse(body)
console.log(parsedData)
if(!parsedData.success){
   return  res.status(400).json({
    message:"Validation Failed",
    errors:parsedData.error.errors
   })
}

try{
    const result=await Book.findByIdAndUpdate(id,parsedData.data,{new:true,runValidators:true})
  if(!result){
   return res.status(404).json({
        message:"Book not found"
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
bookRouter.delete('/:id',async (req:Request,res:Response):Promise<any> => {
const id=req.params.id   
 if(!id){
    return res.status(404).json({
       message:"delete id is not provided" 
    })
 }

try{
    const result=await Book.findByIdAndDelete(id)
  if(!result){
   return res.status(404).json({
        message:"Book dosen't delete sucsessfully"
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
