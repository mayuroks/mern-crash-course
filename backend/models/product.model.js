import mongoose from "mongoose";

// Step 1: Define schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

// Step 2: Create mongoose model, collection names become products
const Product = mongoose.model('Product', productSchema);

// Step 3: Export default. this is a mongoose model
export default Product;