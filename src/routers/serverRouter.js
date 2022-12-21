import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";

const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use(urlRouter);

export default serverRouter;
