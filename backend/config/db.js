import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
    } catch (error) {
       console.error(`Error: ${error.message}`.red.underline.bold, error)
       process.exit(1) 
    }
}

export default connectDB