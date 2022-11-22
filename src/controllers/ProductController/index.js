import { ProductDao } from '../../Dao/index.js';
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from "../../utils/index.js";
import { verifyRole } from "../../mw/index.js";

const getAll = async (req, res)=>{
  const products = await ProductDao.getAll();

  if(!products){
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
  }

  res.send(products)
};

const getById = async (req, res)=>{
  const { id } = req.params;
  const products = id ? await ProductDao.getById(id) : await ProductDao.getAll();
  res.send(products)
};

const createProduct =  async (req, res)=>{
  try {
    const { title, description, code, thumbnail, price, stock } = await req.body;
    const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimeStamp() });
    await ProductDao.save(product);
    res.send(product);
  } catch (error) {
    res.send(error)
  }
};

const deleteById = async (req,res) =>{
  try {
    const { id } = req.params;
    await ProductDao.deleteById(id);
    req.send({ success: true });
    
  } catch (error) {
    console.log(error);
    res.send({ error: `Se produjo un error.`});
  };
  
};

const updateProduct = async (req, res) =>{
  try {
    const { id } = req.params;
    const { title, description, code, thumbnail, price, stock } = req.body;
    const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimeStamp(),})
    const updatedProd = await ProductDao.updateObj(id, product);
    res.send(updatedProd);
  } catch (error) {
    res.send(error);
  }
};

export const ProductController = {
  getAll, getById, createProduct, updateProduct, deleteById,
};