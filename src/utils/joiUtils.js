import joi from 'joi';

const product = joi.object({
  title: joi.string().min(2).max(50).required(),
  description: joi.string().min(2).max(50).required(),
  code: joi.string().min(2).max(50).required(),
  thumbnail: joi.string().min(2).max(50).required(),
  price: joi.number().required(),
  stock: joi.required().required(),
  timestamp: joi.string().required()
})

export const JOI_VALIDATOR = { product };