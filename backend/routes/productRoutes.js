import express from "express"
import { getSingleProduct, getProducts, deleteProductById, updateProduct, createProduct, createProductReview } from "../controllers/productController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"

const router =  express.Router()


router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)


router.route('/:productId')
    .get(getSingleProduct)
    .delete(protect, isAdmin, deleteProductById)
    .put(protect, isAdmin, updateProduct)

router.route('/:productId/reviews')
    .post(protect, createProductReview)
export default router