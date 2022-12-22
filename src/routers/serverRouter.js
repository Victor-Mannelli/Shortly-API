import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
import usersRouter from "./usersRouter.js";

const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use(urlRouter);
serverRouter.use(usersRouter)

export default serverRouter;
