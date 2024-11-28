import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('productosD', productSchema)

export default Product