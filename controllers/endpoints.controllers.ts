import endpointData from "../endpoints.json";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const readEndpoints: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).send(endpointData);
};
