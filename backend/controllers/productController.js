// import express from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"



export const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({})
    res.json(products)
})


export const getSingleProduct = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.productId)
    
    if(product){
        res.json(product)
    }else {
        res.status(404)
        throw new Error('Product not found!')
    }
})