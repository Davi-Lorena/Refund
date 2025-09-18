import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { userRole } from "@prisma/client"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"


class UsersController {
async create(req: Request, res: Response) {

const bodySchema = z.object({
name: z.string().trim().min(2, { message: "Nome é obrigatório"}),
email: z.string().trim().email({ message: "E-mail inválido"}).toLowerCase(),
password: z.string().trim().min(6, { message: "A mensagem deve ter pelo menos 6 dígitos"}),
role: z.enum([userRole.employee, userRole.manager]).default(userRole.employee),
}) 

const { name, email, password, role } = bodySchema.parse(req.body)

const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

if(userWithSameEmail) {
    throw new AppError("Já existe um usuário cadastrado com esse e-mail!")
}

const hashedPassword = await hash(password, 8)

await prisma.user.create({
    data:
    {
        name,
        email,
        password: hashedPassword,
        role,
    }
})

res.status(201).json()
}

}

export { UsersController}