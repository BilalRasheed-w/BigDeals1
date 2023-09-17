import app from "./app.js";
import connectDB from "./config/db.js";

import {config} from "dotenv";
config();

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log("server started", `http://localhost:${port}`);
});

connectDB();
