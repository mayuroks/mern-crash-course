import express, { request } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js"

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json()); // middleware - allows us to use json data in req.body
app.use("/api/products", productRoutes);





app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:8080');
})
