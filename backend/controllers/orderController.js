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
    const order = await Order.findById(req.params.orderId).populate('user', 'name id')

    if(order){
        if(order.user._id.toString() === req.user._id.toString() || req.user.isAdmin ){            
            res.json(order)
        } else {
            res.status(401)
            throw new Error('You are not authorized to view this order!') 
        }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc:   Change order status to paid
// @route:  PUT /api/orders/:orderId/pay
// @access: Private
export const updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.orderId).populate('user', 'id')
 
    if(order.user._id.toString() === req.user._id.toString()  ){ 
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
    } else {
        res.status(401)
        throw new Error('Not authorized') 
    } 
 })


// @desc:   Get list of orders of the user who is currently logged in
// @route:  GET /api/orders/myorders
// @access: Private
export const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id})  
    res.json(orders)
 })

// @desc:   Get all orders
// @route:  GET /api/orders/
// @access: Private/Admin
export const getOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({}).populate('user', 'id name')  
    res.json(orders)
 })


// @desc:   Change order status to delivered
// @route:  PUT /api/orders/:orderId/deliver
// @access: Private/admin
export const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.orderId).populate('user', 'id')
    if(order){
        order.isDelivered = true
        order.deliveredOn = Date.now()
            
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
 })