import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import products from'./data/products.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()

const PORT = process.env.PORT || 5000


app.get('/', (req, res)=>{
    res.send('API is running!')
})

app.get('/api/products', (req, res)=>{
    res.json(products)
})

app.get('/api/products/:productId', (req, res)=>{
    const product = products.find(product=> product._id === req.params.productId)
    res.json(product)
})

app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} environment. \nServer PORT: ${PORT}`.cyan))