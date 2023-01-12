import express from "express"
import { 
    getSingleProduct, 
    getProducts, 
    deleteProductById, 
    updateProduct, 
    createProduct, 
    createProductReview, 
    getTopProducts } from "../controllers/productController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"
import validateProductProps from "../middleware/validateProductProps.js"
import validateReviewProps from "../middleware/validateReviewProps.js"

const router =  express.Router()


router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, validateProductProps, createProduct)

router.route('/top')
    .get(getTopProducts)

router.route('/:productId')
    .get(getSingleProduct)
    .delete(protect, isAdmin, deleteProductById)
    .put(protect, isAdmin, validateProductProps, updateProduct)

router.route('/:productId/reviews')
    .post(protect, validateReviewProps, createProductReview)
export default router