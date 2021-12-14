import express from "express"
import { getSingleProduct, getProducts, deleteProductById } from "../controllers/productController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"

const router =  express.Router()


router.route('/')
    .get(getProducts)



router.route('/:productId')
    .get(getSingleProduct)
    .delete(protect, isAdmin, deleteProductById)

export default router