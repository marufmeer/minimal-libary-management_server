import z from "zod"
export const ZodBookSchema=z.object({
 title:z.string().min(1,"title is required"),
 author:z.string().min(1,"author is required"), 
 genre:z.string().min(1,"genre is required"),
 isbn:z.string().min(1,"isbn is required"),
 description:z.string().min(1,"description is required"),
copies:z.number().min(0,"copies is must be positive"),
 available:z.boolean().default(true)
})

export const ZodBookUpdateSchema=ZodBookSchema.partial()