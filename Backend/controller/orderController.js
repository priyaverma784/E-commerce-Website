import Order from "../models/order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";
import mongoose from "mongoose";  // ← add this

export const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        // ← Convert string to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const cart = await Cart.findOne({ userId: userObjectId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderitems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        const totalAmount = orderitems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        for (let item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productId._id,
                { $inc: { stock: -item.quantity } }
            );
        }

        const newOrder = await Order.create({
            userId: userObjectId,  // ← use converted id
            items: orderitems,
            address,
            totalAmount,
            paymentMethod: "COD"
        });

        await Cart.findOneAndUpdate({ userId: userObjectId }, { items: [] });

        res.status(201).json({
            message: "Order Placed successfully",
            orderId: newOrder._id
        });

    } catch (err) {
        console.error(err);  // ← always log real error
        res.status(500).json({ message: err.message });  // ← expose real error
    }
};