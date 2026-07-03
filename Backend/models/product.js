import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }],
    category: {
        type: String,
        required: true,
        trim : true
    },
    brand: {
        type: String,
        trime: true
    },
    stock: {
        type: Number,
        default: 0
    },
},{
    timestamps: true
}
);

export default mongoose.model("Product", productSchema);