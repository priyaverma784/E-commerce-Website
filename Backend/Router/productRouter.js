import express from "express";
import { addProducts, getProduct, updateProduct, deleteProduct } from "../controller/productContoller.js";

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;