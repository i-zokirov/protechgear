import express from "express"
import { createOrder, getMyOrders, getOrderById, updateOrderToPaid } from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

const router =  express.Router()

router.route('/')
    .post(protect, createOrder)

router.route('/myorders')
    .get(protect, getMyOrders)
 
router.route('/:orderId')
    .get(protect, getOrderById)


router.route('/:orderId/pay')
    .put(protect, updateOrderToPaid)

   
export default router