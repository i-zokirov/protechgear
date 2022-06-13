import expressAsyncHandler from "express-async-handler";
import { reviewSchema } from "../utils/joi.js";

const validateReviewProps = expressAsyncHandler(async (req, res, next) => {
    try {
        const {error} = reviewSchema.validate(req.body)
        if(error){
          throw new Error(error.message)
        } 
        next()
    } catch (error) {
        throw error
    }
})

export default validateReviewProps