import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import AuthRoutes from "./routes/AuthRoutes.js"; 
import ShoppingListRouter from "./routes/ShoppingListRoutes.js"; 
import InventoryRoutes from "./routes/InventoryRoutes.js";
import WastageRoutes from "./routes/WastageRoutes.js";
import FeedbackRoutes from "./routes/FeedbackRoutes.js"; 
import BestProductRoutes from "./routes/BestProductRoutes.js";
import PlacesRoutes from "./routes/PlacesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
  }));
  
app.use(express.json());

const URL = process.env.MONGODB_URL;

//routes
app.use("/auth", AuthRoutes); 
app.use("/ShoppingList", ShoppingListRouter);
app.use("/Inventory", InventoryRoutes);
app.use("/Wastage", WastageRoutes);
app.use("/api/feedback", FeedbackRoutes); 
app.use("/BestProducts", BestProductRoutes);
app.use("/nearby-stores", PlacesRoutes);



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
