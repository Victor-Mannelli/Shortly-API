import { Router } from "express";
import { singUp } from "../controllers/userController.js";
import { validateSignUp } from "../middlewares/userAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, singUp);

export default authRouter;
