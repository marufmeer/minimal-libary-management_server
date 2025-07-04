import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRouter } from "./app/controllers/BookController";
import { borrowRouter } from "./app/controllers/BorrowController";

const app:Application=express()

app.use(express.json())
app.use(cors({
   origin:["https://minimal-libary-management.vercel.app"]
}))



app.use("/books",bookRouter)
app.use("/borrow",borrowRouter)

app.get('/',async (req:Request,res:Response) => {
   res.send("server is created sucsessfully") 
})

export default app