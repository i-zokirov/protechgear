import express from "express"
import { createOrder, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from "../controllers/orderController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"

const router =  express.Router()

router.route('/')
    .get(protect, isAdmin, getOrders)
    .post(protect, createOrder)

router.route('/myorders')
    .get(protect, getMyOrders)
 
router.route('/:orderId')
    .get(protect, getOrderById)


router.route('/:orderId/pay')
    .put(protect, updateOrderToPaid)

   
export default router