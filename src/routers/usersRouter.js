import { Router } from "express";
import * as usersAuth from "../middlewares/usersMiddleware.js"
import * as usersController from "../controllers/usersController.js"

const usersRouter = Router();

usersRouter.get("/users/me", usersAuth.validateUser, usersController.returnData);

export default usersRouter;
