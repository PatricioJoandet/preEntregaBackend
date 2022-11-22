import { CartDao, ProductDao } from '../../Dao/index.js';
import { DATE_UTILS, ERRORS_UTILS} from "../../utils/index.js";

const createCart = async (req, res)=>{
  const baseCart = {timestamp: DATE_UTILS.getTimeStamp(), products: []};
  await CartDao.save(baseCart);
  res.send({ success: true, cartId: baseCart.id});
};

const getCartById = async (req, res) =>{
  try {
    const { id } = req.params;
    const cart = await CartDao.getById(id);
    if(!cart) return res.send({ success: false, message: ERRORS_UTILS.MESSAGES.NO_CART });
    res.send({ success: true, cartProducts: cart.products });
  } catch (error) {
      res.send({ success: false, message: error});
  }
};

const deleteById = async (req,res) =>{
  try {
    const { id } = req.params;
    const cart = await CartDao.getById(id);
    if(!cart) return res.send({success: false, message: ERRORS_UTILS.MESSAGES.NO_CART});
    await CartDao.deleteById(id);
    res.send({ success: true, message: 'Carrito eliminado'});

  } catch (error) {
      res.send({success: false, message: error.message})
  };
};
  
const addProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const { id } = req.params;

    const cart = await CartDao.getById(id);
    if(!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

    const product = await ProductsDao.getById(productId);
    if(!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    await cart.products.push(product);
    const updatedCart = await CartDao.updateObj(id, cart);
    
    res.send({ success: true, cart: updatedCart });
  } catch (error) {
      res.send(error);
  }
};


const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartDao.getById(id);
    if(!cart) return res.send({ success: false, message: ERRORS_UTILS.MESSAGES.NO_CART});
    const { productid } = req.params;
    const productsInCart = cart.products.filter((product) => product.id !== productid);
    await CartDao.updateObj(id, productsInCart);
    res.send({ success: true, message: "Elemento eliminado del carrito" } );
  
  } catch (error) {
      res.send({ success: false, message: error});
  }
};
  
export const CartController = {
  createCart, getCartById, deleteById, deleteFromCart, addProduct,
};