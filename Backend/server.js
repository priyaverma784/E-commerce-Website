import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRouter from "./Router/AuthRouter.js";
import ProductRouter from "./Router/productRouter.js";
import CartRouter from "./Router/cartRouter.js";
import AddressRouter from "./Router/addressRouter.js";
import OrderRouter from "./Router/orderRouter.js";
import wishlistRoutes from "./Router/wishlistRouter.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//Router
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/order", OrderRouter);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
    res.send("Backend is Running");
});

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});