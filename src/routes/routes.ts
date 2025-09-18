import { Router } from "express"

import { userRoutes } from "./users-routes"

import { sessionsRoutes } from "./sessions-routes"

import { refundsRoutes } from "./refund-routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)

// Private routes
routes.use("/refunds", refundsRoutes)

export { routes }