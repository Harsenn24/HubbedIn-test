import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoute);

mongoose.connect(process.env.MONGO_URL as string);
const port = process.env.PORT || 3000;

app.listen(+port, () => {
  console.log("Server running on port 3000");
});

export default app;
