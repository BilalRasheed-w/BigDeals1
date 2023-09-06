import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import ProductRoutes from "./routes/productR.js";
import { errMiddleware } from "./error/globalError.js";

app.use("/api", ProductRoutes);

app.use(errMiddleware);

export default app;
