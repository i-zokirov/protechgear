import expressAsyncHandler from "express-async-handler";
import { productSchema } from "../utils/joi.js";

const validateProductProps = expressAsyncHandler(async (req, res, next) => {
    try {
        const {error} = productSchema.validate(req.body)
        if(error){
          throw new Error(error.message)
        } 
        next()
    } catch (error) {
        throw error
    }
})

export default validateProductProps