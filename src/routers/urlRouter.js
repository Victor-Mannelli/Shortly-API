import { Router } from "express";
import * as urlAuth from "../middlewares/urlAuthMiddleware.js"
import * as urlController from "../controllers/urlController.js"

const urlRouter = Router();

urlRouter.post("/urls/shorten", urlAuth.validateUrl, urlController.shortenUrl);

export default urlRouter;
