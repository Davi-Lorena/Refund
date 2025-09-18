import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"


class UsersController {
async create(req: Request, res: Response) {

res.json({message: "ok"})
}

}

export { UsersController}