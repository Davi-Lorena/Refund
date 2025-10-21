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

async index(req: Request, res: Response) {

const querySchema = z.object({
name: z.string().optional().default(""),
page: z.coerce.number().min(1).default(1),
perPage: z.coerce.number().optional().default(10)
})

const { name, page, perPage } = querySchema.parse(req.query)

// Calculando o skip 

const skip = (page - 1) * perPage

    const refunds = await prisma.refunds.findMany({
        skip,
        take: perPage,
        where: {
            user: {
                name: {
                    contains: name.trim()
                }
            }
        },
        orderBy: { createdAt: "desc"},
        include: {user: true}
    })

    // Obter o número de registros para calcular o número de páginas 

    const totalRecords = await prisma.refunds.count({
        where: {
            user: {
                name: {
                    contains: name.trim()
                }
            }
        },
    })

    const totalPages = Math.ceil(totalRecords / perPage)

    res.json({refunds,
        pagination: {
            page,
            perPage,
            totalRecords,
            totalPages: totalPages > 0 ? totalPages : 1,
        }
    })
}

}

export { RefundsController }