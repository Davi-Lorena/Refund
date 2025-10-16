import { Router } from "express";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { RefundsController } from "@/controllers/refunds-controller";

const refundsRoutes = Router()

const refundsController = new RefundsController()

refundsRoutes.post("/", 
    verifyUserAuthorization(["employee"])
    , // Aqui é um bom lugar para se destacar o uso do NextFunction, tendo em vista que, se o usuário tiver essa role, o next "pula" para o próximo controller
    refundsController.create
)

refundsRoutes.get("/",
verifyUserAuthorization(["manager"]),
    refundsController.index
)

export { refundsRoutes}