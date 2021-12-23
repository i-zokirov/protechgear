import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from "path"
import morgan from 'morgan'
import rfs from 'rotating-file-stream'

import products from'./data/products.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()
connectDB()
const __dirname = path.resolve()
const app = express()

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json())


const PORT = process.env.PORT || 5000


app.get('/', (req, res)=>{
    res.send('API is running!')
})

// routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} environment. \nServer PORT: ${PORT}`.cyan))