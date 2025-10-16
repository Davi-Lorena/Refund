import { prisma } from "@/database/prisma"
import { request, Request, Response } from "express"
import { z } from "zod"
import { AppError } from "@/utils/AppError"
import { Category } from "@prisma/client"

const categories = z.nativeEnum(Category)

// const categoriesEnum = z.enum([
//     "food", 
//     "others", 
//     "services", 
//     "transport", 
//     "accomodation"
// ])

class RefundsController {
async create(req: Request, res: Response) {
const bodySchema = z.object({
    name: z.string().trim().min(1,{ message: "Inform solicitation name"}), 
category: categories,
amount: z.number().positive({message: "The value must be positive"}),
filename: z.string().min(20)
})

const {name, category, amount, filename} = bodySchema.parse(req.body)

if(!req.user?.id) {
    throw new AppError("Unauthorized!", 401)
}

const refund = await prisma.refunds.create({
    data: {
        name, 
        category,
        amount,
        filename,
        userId: req.user.id
    }
})


    res.status(201).json(refund)
}

}

export { RefundsController }