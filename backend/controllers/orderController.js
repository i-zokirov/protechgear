import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"


// @desc:   create new order
// @route:  POST /api/orders
// @access: Private
export const createOrder = asyncHandler(async(req, res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No Order items')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            shippingPrice, 
            taxPrice, 
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc:   Get order by id
// @route:  GET /api/orders/:orderId
// @access: Private
export const getOrderById = asyncHandler(async(req, res)=>{
   const order = await Order.findById(req.params.orderId).populate('user', 'name')

   if(order){
       res.json(order)
   } else {
       res.status(404)
       throw new Error('Order not found')
   }
})

// @desc:   Change order status to paid
// @route:  PUT /api/orders/:orderId/pay
// @access: Private
export const updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.orderId)
 
    if(order){
        order.isPaid = true
        order.paidOn = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
 })