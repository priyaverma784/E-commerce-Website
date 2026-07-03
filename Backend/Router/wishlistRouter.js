import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controller/WishlistController.js";

const router = express.Router();

router.get("/:userId", getWishlist);
router.post("/:userId", addToWishlist);
router.delete("/:userId/:productId", removeFromWishlist);
router.delete("/:userId", clearWishlist);

export default router;