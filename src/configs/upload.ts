import multer from "multer"
import path from "node:path"
import crypto from "node:crypto"

// Tudo em maiúsculo, por serem constantes de referência

// const para endereço da pasta temporária
// ./../../tmp -> Não utilizamos dessa forma pela mudança que o caminho pode sofrer
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")

// Pasta de uploads pós-temporária
const UPLOADS_FOLDER = path.relative(TMP_FOLDER, "uploads")

const MAX_SIZE = 3
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE // 3MB (Obrigado, Minoru)

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

// Praticamente um middleware
const MULTER = {
    // Permite que manipulemos o arquivo no próprio disco em que a API está rodando
    storage: multer.diskStorage({
destination: TMP_FOLDER,
filename(req, file, callback) {
    const fileHash = crypto.randomBytes(10).toString("hex")
    const filename = `${fileHash}-${file.originalname}`

    return callback(null, filename)
}
    }) 
}

export default {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
    MAX_SIZE,
    MAX_FILE_SIZE,
    ACCEPTED_IMAGE_TYPES
}