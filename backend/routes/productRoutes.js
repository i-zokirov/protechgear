import express from "express"
import { getSingleProduct, getProducts } from "../controllers/productController.js"

const router =  express.Router()

// Fetch all products
router.route('/')
    .get(getProducts)


// Fetch single product by id
router.route('/:productId')
    .get(getSingleProduct)

export default router