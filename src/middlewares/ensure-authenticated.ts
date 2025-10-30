import { Request, Response, NextFunction } from "express"
/* NextFunction importado pois agora queremos que o usuário "Siga seu fluxo" na aplicação */
import { authConfig } from "@/configs/auth";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
    role: string 
    sub: string
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
try {

    const authHeader = req.headers.authorization

if(!authHeader) {
    throw new AppError("JWT Token não encontrado", 401)
}

// Estrutura do token -> authorization: Bearer token
// ["Bearer", "token"]
// [, token] = token
const [, token] = authHeader.split(" ")

// Verify retorna o objeto do PAYLOAD do token
const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPayload

req.user = {
    id: user_id,
    role,
}

return next()

} catch (error) {
    throw new AppError("Invalid JWT Token", 401)
}
}

export { ensureAuthenticated}