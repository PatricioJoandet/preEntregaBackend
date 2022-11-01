import { Router } from "express";
import { cartDao, productsDao } from '../../Dao/index.js';
import { DATE_UTILS, ERRORS_UTILS} from "../../utils/index.js";
import { verifyRole } from "../../mw/index.js";
const router = Router();

router.post('/', async (req, res)=>{
  const baseCart = {timestamp: DATE_UTILS.getTimeStamp(), products: []};
  await cartDao.save(baseCart);
  res.send({ success: true, cartId: baseCart.id});
});

router.get('/:id/products', async (req, res) =>{
  console.log("asd")
  try {
    const { id } = req.params;
    const cart = await cartDao.getById(Number(id));
    if(!cart) return res.send({ success: false, message: ERRORS_UTILS.MESSAGES.NO_CART });
    res.send({ success: true, cartProducts: cart.products });
  } catch (error) {
      res.send({ success: false, message: error});
  }
})

router.delete('/:id', verifyRole, async (req,res) =>{
  try {
    const { id } = req.params;
    const cart = await cartDao.getById(Number(id));
    if(!cart) return res.send({success: false, message: ERRORS_UTILS.MESSAGES.NO_CART});
    await cartDao.deleteById(Number(id));
    res.send({ success: true, message: 'Carrito eliminado'});

  } catch (error) {
      res.send({success: false, message: error.message})
  };
});
  
router.post('/:id/products', async (req, res) => {
  try {
    const { productId } = req.body;
    const { id } = req.params;

    const cart = await cartDao.getById(Number(id));
    if(!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

    const product = await productsDao.getById(Number(productId));
    if(!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    await cart.products.push(product);
    const updatedCart = await cartDao.updateObj(Number(id), cart);
    
    res.send({ success: true, cart: updatedCart });
  } catch (error) {
      res.send(error);
  }
});


router.delete('/:id/products/:productId', async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartDao.getById(Number(id));
    if(!cart) return res.send({ success: false, message: ERRORS_UTILS.MESSAGES.NO_CART});
    const { productid } = req.params;
    const productsInCart = cart.products.filter((product) => product.id !== Number(productid));
    await cartDao.updateObj(Number(id), productsInCart);
    res.send({ success: true, message: "Elemento eliminado del carrito" } );
  
  } catch (error) {
      res.send({ success: false, message: error});
  }
})
  



export { router as CartRouter };