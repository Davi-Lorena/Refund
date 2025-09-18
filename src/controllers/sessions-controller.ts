import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

class SessionsController {

async create(req: Request, res: Response) {
const bodySchema = z.object({
email: z.string().trim().email({ message: "E-mail inválido"}),
password: z.string(), // Não validamos nada mais aqui, nem a quantidade mnínima de caracteres, porque faremos a comparação com a senha do banco

})

const { email, password } = bodySchema.parse(req.body)

const user = await prisma.user.findFirst({ where: { email }})

if(!user) {
    throw new AppError("E-mail ou senha inválido!", 401)
}

const passwordMatched = await compare(password, user.password)

if(!passwordMatched) {
     throw new AppError("E-mail ou senha inválido!", 401)
}

const { secret, expiresIn} = authConfig.jwt

const token = sign({user: user.role}, secret, {
    subject: user.id,
    expiresIn
})

const { password: _, ...userWithoutPassword} = user

    res.json({token, user: userWithoutPassword})
}

}

export {SessionsController}