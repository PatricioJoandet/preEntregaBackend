import { ContainerMongoDB } from '../../Container/ContainerMongoDB.js';
import { ProductModel } from '../../models/index.js';

export class ProductMongo extends ContainerMongoDB {
  constructor() {
    super({
      name: ProductModel.ProductsCollection,
      schema: ProductModel.ProductSchema,
    });
  }
}