import { Request, Response } from "express"
import z, { ZodError } from "zod"

import uploadConfig from "@/configs/upload"
import { DiskStorage } from "@/providers/disk-storage"
import { AppError } from "@/utils/AppError"

class UploadsController {

    async create(req: Request, res: Response) {
    const diskStorage = new DiskStorage()

try {
    const fileSchema = z.object({
        filename: z.string().min(1, "File is required"),
        mimetype: z.string().refine((type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type), "File format invalid! Options: " + uploadConfig.ACCEPTED_IMAGE_TYPES),
        size: z.number().positive().refine((size) => size <= uploadConfig.MAX_FILE_SIZE, `Maximum size exceeded (${uploadConfig.MAX_SIZE}mb)`)
    }).passthrough()

const file = fileSchema.parse(req.file)

const filename = await diskStorage.saveFile(file.filename)

res.json({filename})

} catch (error) {

if(error instanceof ZodError) {
    if(req.file) {
        await diskStorage.deleteFile(req.file.filename, "tmp")
    }

    throw new AppError(error.issues[0].message)
}

    throw error
}

    }
}

export { UploadsController}