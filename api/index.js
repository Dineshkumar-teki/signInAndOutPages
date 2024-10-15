import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("app listens to port 3000");
    });
  })
  .catch((err) => console.log(err));

app.use("/", userRoutes);
