import express from "express";
import Product from '../models/product.model.js';
import mongoose from "mongoose";
const router = express.Router();

router.get("", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products, dev_name: "Mayur R"});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

router.post("", async (req, res) => {

    const product = req.body;

    if (!product || !product.name || !product.image || !product.price) {
        return res.status(400).json({success: false, message: "Please provide all fields name, price and image"});
    }

    const newProduct = Product(product);

    try {
        await newProduct.save();
        res.status(200).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`id: ${id}`);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"})
    } catch (error) {
        console.error("Error in Delete product", error.message);
        res.status(404).json({ success: false, message: "Product not found"});
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        if (!updatedProduct) {
            res.status(404).json({ success: false, message: "Product not found"});
        } else {
            res.status(200).json({success: true, data: updatedProduct})
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }

});

export default router;