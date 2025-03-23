import express, { request } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js"
import path from 'path'

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 8080
const __dirname = path.resolve()

app.use(express.json()); // middleware - allows us to use json data in req.body

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})
