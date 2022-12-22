import { Router } from "express";
import * as rankingController from "../controllers/rankingController.js";

const rakingRouter = Router();

rakingRouter.get("/ranking", rankingController.showRanking);

export default rakingRouter;
