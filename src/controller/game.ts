import { Request, Response } from "express";

import { getPlayerService, getCurrentSegmentService } from "../services/game";
import { success, fail } from "../utils/response";

export async function getPlayer(req: Request, res: Response): Promise<void> {
  try {
    const playerFound = await getPlayerService(req.params.address);

    success(res, 200, playerFound, "Player is fetched successfully");
  } catch (exception) {
    fail(res, 422, `${exception}`);
  }
}

export async function getCurrentSegment(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const currentSegment = await getCurrentSegmentService();
    success(
      res,
      200,
      currentSegment,
      "Current Segment is fetched successfully"
    );
  } catch (exception) {
    fail(res, 422, `${exception}`);
  }
}
