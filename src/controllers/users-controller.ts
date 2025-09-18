import { Request, Response, NextFunction } from "express"
import { object, z } from "zod"
import { prisma } from "@/database/prisma"
import { userRole } from "@prisma/client"


class UsersController {
async create(req: Request, res: Response) {

const bodySchema = z.object({
name: z.string().trim().min(2, { message: "Nome é obrigatório"}),
email: z.string().trim().email({ message: "E-mail inválido"}).toLowerCase(),
password: z.string().trim().min(6, { message: "A mensagem deve ter pelo menos 6 dígitos"}),
role: z.enum([userRole.employee, userRole.manager]).default(userRole.employee),
}) 

const { name, email, password, role } = bodySchema.parse(req.body)


res.json({ name, email, password, role })
}

}

export { UsersController}