import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogDB";

app.use(bodyParser.json());

mongoose.connect(MONGO_URI).then(() => console.log("Connected to MongoDB")).catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blogging API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});