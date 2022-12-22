import { Router } from "express";
import * as urlAuth from "../middlewares/urlAuthMiddleware.js";
import * as urlController from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", urlAuth.validateUrl, urlController.shortenUrl);
urlRouter.get("/urls/:id", urlAuth.validateUrlFilter, urlController.urlFilter);
urlRouter.get("/urls/open/:shortUrl", urlAuth.validateShortUrl, urlController.openShortUrl);

export default urlRouter;
