import Cart from "../models/Cart.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist → create new
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      // Check if product already exists in cart
      const item = cart.items.find(
        (i) => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1; // increase quantity
      } else {
        cart.items.push({ productId, quantity: 1 }); // add new product
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart",
      cart
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err
    });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove product
    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err
    });
  }
};

// Update Quantity
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({
      message: "Item updated successfully",
      cart
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err
    });
  }
};

// GET cart by userid 
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params; 

    const cart = await Cart.findOne({ userId })
      .populate("items.productId"); 

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }
    res.status(200).json(cart);
  } catch (err) {
    
    res.status(500).json({
      message: "Server Error",
      err
    });
  }
};