import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

import ProductRoutes from "./routes/productR.js";
import UserRoutes from "./routes/userR.js";
import OrderRoutes from "./routes/orderR.js";
import { errMiddleware } from "./error/globalError.js";

app.use("/api", ProductRoutes);
app.use("/api", UserRoutes);
app.use("/api", OrderRoutes);

app.use(errMiddleware);

export default app;
