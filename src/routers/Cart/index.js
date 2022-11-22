import { Router } from "express";
import { verifyRole } from "../../mw/index.js";
import {CartController} from '../../controllers/index.js';

const router = Router();

router.post('/', CartController.createCart);

router.get('/:id/products', CartController.getCartById)

router.delete('/:id', verifyRole, CartController.deleteById);
  
router.post('/:id/products', CartController.addProduct);

router.delete('/:id/products/:productId', CartController.deleteFromCart)

export { router as CartRouter };