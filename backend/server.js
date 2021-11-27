const express = require('express')


const products = require('./data/products')
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

app.listen(PORT, ()=> console.log(`Server is running. \nServer PORT: ${PORT}`))