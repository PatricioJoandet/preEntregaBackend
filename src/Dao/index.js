import { ContainerFilesystem } from '../Container/index.js';

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const productsDao = new ContainerFilesystem(PRODUCTS_FILENAME);
const cartDao = new ContainerFilesystem(CARTS_FILENAME);

export { productsDao, cartDao };