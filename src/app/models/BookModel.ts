import { Schema,model } from "mongoose";
import { BookI } from "../interfaces/BookInterfaces";


const BookSchema=new Schema<BookI>({
title:{
        type:String,
        required:true
    },
author:{
        type:String,
        required:true
    }, 
genre:{
        type:String,
        required:true
    },
isbn:{
        type:String,
        required:true
    }, 
description:{
        type:String,
        required:true
    },
copies:{
        type:Number,
        required:true,
        min:[0,"copies must me a positive number"]
    },
     available:{
        type:Boolean,
        default:true,
        required:true
    },
})
export const Book=model<BookI>("Book",BookSchema)