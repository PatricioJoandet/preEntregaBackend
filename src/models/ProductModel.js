import { Schema } from "mongoose";

const ProductsCollection = "products";

const ProductSchema = new Schema({
  title: {type: String, required: true, max: 50},
  description: {type: String, required: true, max: 50},
  code: {type: String, required: true},
  thumbnail: {type: String, required: true, max: 50},
  price: {type: Number, required: true},
  stock: {type: Number, required: true, default: 1},
  timestamp: {type: String, required: true},
},{
  virtuals: true,
});

ProductSchema.set("toJSON", {
  transform: (_, response) =>{
    response.id = response._id;
    delete response._id;
    delete response.__v
    return response;
  },
})

export const ProductModel = { ProductSchema, ProductsCollection };

