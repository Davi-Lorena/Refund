import { Request, Response, NextFunction } from "express"
import { object, z } from "zod"
import { prisma } from "@/database/prisma"
import { userRole } from "@prisma/client"
import { AppError } from "@/utils/AppError"

class SessionsController {

async create(req: Request, res: Response) {

    res.json({message:"ok"})
}

}

export {SessionsController}