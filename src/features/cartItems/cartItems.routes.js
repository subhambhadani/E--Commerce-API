
import express from 'express';
import { CartItemsController } from './cartItems.controller.js';

// Intialise express router 
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.post("/",cartController.add);
cartRouter.get("/",cartController.get);
cartRouter.delete("/:id",cartController.delete);



export default cartRouter;