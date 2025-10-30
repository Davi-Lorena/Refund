import { Request, Response } from "express"
import z from "zod"

import uploadConfig from "@/configs/upload"

class UploadsController {
    async create(req: Request, res: Response) {

try {
    const fileSchema = z.object({
        filename: z.string().min(1, "File is required"),
        mimetype: z.string().refine((type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type), "File format invalid! Options: " + uploadConfig.ACCEPTED_IMAGE_TYPES),
        size: z.number().positive().refine((size) => size <= uploadConfig.MAX_FILE_SIZE, `Maximum size exceeded (${uploadConfig.MAX_SIZE}mb)`)
    }).passthrough()

const { file } = fileSchema.parse(req.file)

res.json({message: "OK!"})

} catch (error) {
    throw error
}

    }
}

export { UploadsController}