import { Router } from "express";
import * as userController from "../controllers/userAuthController.js";
import * as userAuth from "../middlewares/userAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", userAuth.validateSignUp, userController.singUp);
authRouter.post("/signin", userAuth.validateSignIn, userController.singIn);

export default authRouter;
