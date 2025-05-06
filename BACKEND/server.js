import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import AuthRoutes from "./routes/AuthRoutes.js"; 
import UserRoutes from "./routes/UserRoutes.js"
import ShoppingListRouter from "./routes/ShoppingListRoutes.js"; 
import InventoryRoutes from "./routes/InventoryRoutes.js";
import WastageRoutes from "./routes/WastageRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

//routes
app.use("/api/auth", AuthRoutes); 
app.use("/api/user", UserRoutes);
app.use("/ShoppingList", ShoppingListRouter);
app.use("/api/inventory", InventoryRoutes);
app.use("/Wastage", WastageRoutes)


//connect to the database
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection successful!"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
