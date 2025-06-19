import { app } from "./app.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 3000;
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
