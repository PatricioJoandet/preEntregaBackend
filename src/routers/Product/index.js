import { Router } from "express";
import { productsDao } from '../../Dao/index.js';
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from "../../utils/index.js";
import { verifyRole } from "../../mw/index.js";
const router = Router();

router.get('/', async (req, res)=>{
  const products = await productsDao.getAll();

  if(!products){
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
  }

  res.send(products)
});

router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const products = id ? await productsDao.getById(Number(id)) : await productsDao.getAll();
  res.send(products)
});

router.post('/', verifyRole, async (req, res)=>{
  try {
    const { title, description, code, thumbnail, price, stock } = await req.body;
    const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimeStamp() });
    await productsDao.save(product);
    res.send(product);
  } catch (error) {
    res.send(error)
  }
});

router.delete('/:id', verifyRole, async (req,res) =>{
  try {
    const { id } = req.params;
    await productsDao.deleteById(Number(id));
    req.send({ success: true });
    
  } catch (error) {
    console.log(error);
    res.send({ error: `Se produjo un error.`});
  };
  
});

router.put('/:id', verifyRole, async (req, res) =>{
  try {
    const { id } = req.params;
    const { title, description, code, thumbnail, price, stock } = req.body;
    const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimeStamp(),})
    const updatedProd = await productsDao.updateObj(Number(id), product);
    res.send(updatedProd);
  } catch (error) {
    res.send(error);
  }
})

export { router as ProductRouter };