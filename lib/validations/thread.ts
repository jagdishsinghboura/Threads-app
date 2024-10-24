import  * as z from "zod"

export const threadValidation =z.object({
    thread:z.string().nonempty().min(3, {
        message:"Minimum 3 character"
    }),
    accountId:z.string(),
})
export const commentValidation =z.object({
    thread:z.string().nonempty().min(3, {
        message:"Minimum 3 character"
    }),
})