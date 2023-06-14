import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleAuthErrors, handleCustomErrors, handleServerErrors } from "./errors/error"

import parksRouter from "./routers/parksRouter";
import usersRouter from "./routers/usersRouter";
import reviewsRouter from "./routers/reviewsRouter";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/parks", parksRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);

app.get("*", (req: Request, res: Response) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use(handleCustomErrors);
app.use(handleServerErrors);
app.use(handleAuthErrors);

export default app;