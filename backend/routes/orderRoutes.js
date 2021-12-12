import express from "express"
import { createOrder, getOrderById } from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

const router =  express.Router()

router.route('/')
    .post(protect, createOrder)

router.route('/:orderId')
    .get(protect, getOrderById)
export default router