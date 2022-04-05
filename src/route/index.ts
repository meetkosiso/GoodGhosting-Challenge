import express from "express";

import gameRoute from "./game";
const router = express.Router();

router.use(gameRoute);

export default router;
