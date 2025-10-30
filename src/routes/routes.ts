import { Router } from "express"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

import { userRoutes } from "./users-routes"

import { sessionsRoutes } from "./sessions-routes"

import { refundsRoutes } from "./refund-routes"

import { uploadsRoutes } from "./uploads-routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)

// Private routes
routes.use(ensureAuthenticated) // Rotas daqui pra baixo pedem ele 
routes.use("/refunds", refundsRoutes)
routes.use("/uploads", uploadsRoutes)

export { routes }