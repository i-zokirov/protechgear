import multer from "multer"
import util from "util"
import path from "path"
const maxUploadSize = 2 *1024 *1024

async function checkFileType (file, cb){
    const filetypes = /jpg|jpeg|png/

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    } else {
        return cb('File type is not accepted. Accepted file types are jpg|jpeg|png')
    }
}
const storage = multer.memoryStorage()

const processFile = multer({
    storage,
    limits: {fileSize: maxUploadSize},
    fileFilter: async function (req, file, cb){
        checkFileType(file, cb)
    }
}).single("image")

const processFileMiddleware = util.promisify(processFile)

export default processFileMiddleware