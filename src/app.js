import express, { json } from "express";
import cors from "cors";
import serverRouter from "./routers/serverRouter.js";

const app = express();
app.use(cors());
app.use(json());

app.use(serverRouter);

export default app;
