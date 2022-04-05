import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import route from "./route";

const app = express();
dotenv.config();

app.use(morgan("dev"));

app.use("/api", route);

app.use((req: Request, res: Response, next: NextFunction): void => {
  const error = new Error("Not found!");
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: {
      message: `API says ${error.message}`,
    },
  });
  next();
});

app.listen(process.env.PORT || 3000, () =>
  console.log("listening at port 3000")
);

export default app;
