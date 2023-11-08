import * as express from "express";
const router = express.Router();
// Middlewares
import { isAuthenticated } from './../../middleware';
import { save, listProducts} from './products.controller'

// Routes
router.post('/save',save)
router.get('/listProducts',listProducts)

export default router;