import express from "express"
import { upload } from "../controllers/fileUploadController.js"
import { isAdmin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
    .post(protect, isAdmin, upload)


export default router