import Wishlist from "../models/Wishlist.js";

// GET /wishlist/:userId — fetch user's wishlist with product details
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    let wishlist = await Wishlist.findOne({ userId }).populate("items.productId");

    if (!wishlist) {
      wishlist = { userId, items: [] };
    }

    // Send items in a clean format
    const items = wishlist.items.map((item) => ({
      productId: item.productId?._id,
      product: item.productId, // full product info
      addedAt: item.addedAt,
    }));

    res.status(200).json({ items });
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

// POST /wishlist/:userId — add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [{ productId }] });
    } else {
      // Check if already added
      const exists = wishlist.items.some(
        (item) => item.productId.toString() === productId
      );
      if (exists) {
        return res.status(200).json({ message: "Already in wishlist" });
      }
      wishlist.items.push({ productId });
    }

    await wishlist.save();
    res.status(200).json({ message: "Added to wishlist", wishlist });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// DELETE /wishlist/:userId/:productId — remove item
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};

// DELETE /wishlist/:userId — clear entire wishlist (optional)
export const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    await Wishlist.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: "Wishlist cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear wishlist" });
  }
};