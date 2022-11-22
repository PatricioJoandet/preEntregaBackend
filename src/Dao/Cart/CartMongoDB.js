import { ContainerMongoDB } from '../../Container/ContainerMongoDB.js';
import { ProductModel as CartModel } from '../../models/index.js';

export class CartMongo extends ContainerMongoDB {
  constructor() {
    super({
      name: CartModel.CartCollection,
      schema: CartModel.CartSchema,
    });
  }
}