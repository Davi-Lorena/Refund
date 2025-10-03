// Extensão do Request do Express
declare namespace Express {
    // Extensão da interface Request
    export interface Request {
        // Injeta a propriedade user 
        user?: {
            id: string
            role: string
        }
    }
}

// Extensão .d.ts garante uma interface global no projeto