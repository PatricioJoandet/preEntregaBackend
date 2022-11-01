import express from 'express';
import { ProductRouter, CartRouter } from './routers/index.js';
import { config  } from './config/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use('/api/products', ProductRouter);
app.use('/api/cart', CartRouter);

app.listen(config.SERVER.PORT, ()=> console.log(`Server conectado en puerto ${config.SERVER.PORT}`));
