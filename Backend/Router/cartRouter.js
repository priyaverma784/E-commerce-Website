import express from "express";
import { addToCart, removeFromCart, updateQuantity, getCart } from "../controller/cartController.js";

const router = express.Router();

router.post('/add', addToCart);
router.post('/remove',removeFromCart);
router.post('/update',updateQuantity);
router.get('/:userId', getCart);

export default router;