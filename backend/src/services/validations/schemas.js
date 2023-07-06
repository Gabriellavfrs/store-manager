const Joi = require('joi');

const productNameSchema = Joi.object({
  name: Joi.string().min(5),
  });

const saleQuantitySchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().min(1),
  quantity: Joi.number().integer().min(1),
}));

module.exports = {
  productNameSchema,
  saleQuantitySchema,
};