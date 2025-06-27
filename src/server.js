import { app } from "./app.js";
import connectDB from "../db/index.js";
import { PORT, ENV } from "./config/config.js";
console.log(ENV);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
