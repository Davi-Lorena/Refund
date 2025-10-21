import { Router } from "express";
import multer from "multer";

import uploadConfig from "@/configs/upload"

import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

import { UploadsController } from "@/controllers/uploads-controller";

const uploadsRoutes = Router()

const uploadsController = new UploadsController()

// Tudo o que foi definido na const multer do arquivo de configurações poderia ser colocado aqui
// Porém, para manter o código mais organizado, criamos o arquivo de configurações
const upload = multer(uploadConfig.MULTER)

uploadsRoutes.use(verifyUserAuthorization(["employee"]))
uploadsRoutes.post("/", upload.single("file"), uploadsController.create) // single -> para upload de um único arquivo e file -> nome do campo que conterá o arquivo no corpo da requisição

export { uploadsRoutes}