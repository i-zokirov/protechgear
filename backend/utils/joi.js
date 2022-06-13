import joi from "joi"
import sanitizeHtml from 'sanitize-html';


const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value)
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean
            }
        }
    }
})

const Joi = joi.extend(extension)

export const productSchema = Joi.object({
        name: Joi.string().required().escapeHTML(),
        user: Joi.string(),
        image: Joi.string().required().escapeHTML(),
        brand: Joi.string().required().escapeHTML(),
        category: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        countInStock: Joi.number().required().min(0),
        rating: Joi.number().min(0),
        numReviews: Joi.number().min(0),
})

export const reviewSchema = Joi.object({
            name: Joi.string().escapeHTML(),
            rating: Joi.number().min(1).max(5),
            comment: Joi.string().escapeHTML(),
})