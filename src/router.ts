import * as express from "express";
const router = express.Router();

// Routers
import Product from "./modules/products/products.router";
import Cart from "./modules/cart/cart.router";
// Routes
router.use('/product', Product)
router.use('/cart', Cart)
export default router;
