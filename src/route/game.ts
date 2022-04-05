import express from "express";
import * as gameController from "../controller/game";

const router = express.Router();

router.get("/player/:address", gameController.getPlayer);

router.get("/currentSegment", gameController.getCurrentSegment);

export default router;
