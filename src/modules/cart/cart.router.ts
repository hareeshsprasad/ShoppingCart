import * as express from "express";
const router = express.Router();
// Middlewares
import { isAuthenticated } from './../../middleware';
import { addToCart, viewCart, removeItem, total} from './cart.controller'

// Routes
router.post('/addToCart',addToCart)
router.get('/viewCart',viewCart)
router.delete('/removeItem',removeItem)
router.get('/total',total)
export default router;