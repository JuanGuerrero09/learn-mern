// import env from './util/validateEnv'
import app from "./app";
import mongoose from "mongoose";
const PORT = process.env.PORT


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(() => {
  console.log("mongoose connected");
  app.listen(PORT, () => {
    console.log(`server created on port: ${PORT}`);
  });
}).catch(console.error);
