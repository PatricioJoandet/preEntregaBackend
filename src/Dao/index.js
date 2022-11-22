import { ContainerFilesystem } from '../Container/index.js';
import { config } from '../config/index.js';
import { CartMongo } from './Cart/index.js';
import { ProductMongo } from './Product/index.js';
import { MongoDBService } from '../services/MongoDBService/index.js';

/* const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const productsDao = new ContainerFilesystem(PRODUCTS_FILENAME);
const cartDao = new ContainerFilesystem(CARTS_FILENAME);
 */

const SELECTED_DATABASE = 'mongo';

const getSelectedDaos= () =>{
  switch(SELECTED_DATABASE){
    case "mongo": {
        MongoDBService.init()
        return {
          ProductDao: new ProductMongo(),
          CartDao: new CartMongo(),
      };
    }
  }
};

const { ProductDao, CartDao } = getSelectedDaos();
export { ProductDao, CartDao };