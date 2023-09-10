import express from "express";
const app = express();
import cookieParser from 'cookie-parser'  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


import ProductRoutes from "./routes/productR.js";
import UserRoutes from "./routes/userR.js";
import OrderRoutes from "./routes/orderR.js";
import { errMiddleware } from "./error/globalError.js";

app.use("/api", ProductRoutes);
app.use("/api", UserRoutes);
app.use("/api", OrderRoutes);


app.use(errMiddleware);

export default app;
