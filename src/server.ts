import mongoose from "mongoose";
import app from "./app";
let server;
const port=2000 
const bootstrap=async()=>{
    try{
     await mongoose.connect("mongodb+srv://manage-libary:maruf0194@cluster0.tfmo3.mongodb.net/Management-Libary?retryWrites=true&w=majority&appName=Cluster0")
 console.log('sucessfully connected with mongodb')
 server= app.listen(port,()=>{
    console.log(`server is listening the port ${port}`)
 })    
    }
  catch(error){
    console.log(error)
  }
  
}
bootstrap()

