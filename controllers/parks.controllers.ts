import {
  addNewPark,
  deleteParkByID,
  getAllParks,
  getParkByID,
  getParksByUserID,
  updateParkByID,
} from "../models/parks.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isValidParkRequest, isValidParkUpdateRequest } from "../utils/typeGuard";

export const getParks: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAllParks()
    .then((returnedParks) => res.status(200).send(returnedParks))
    .catch(next);
};

export const getPark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  getParkByID(park_id)
    .then((returnedPark) => res.status(200).send(returnedPark))
    .catch(next);
};

export const addPark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newPark = req.body;
  if (!newPark || !isValidParkRequest(newPark)) {
    res.status(400).send({ msg: "Invalid park details" });
  } else {
    addNewPark(newPark)
      .then((returnedPark) => res.status(201).send(returnedPark))
      .catch(next);
  }
};

export const deletePark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  deleteParkByID(park_id)
    .then(() => res.status(204).send())
    .catch(next);
};

export const updatePark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  const updatedPark = req.body;
  const updatedParkRequest = { park_id, ...updatedPark };
  if (!park_id || !updatedPark || !isValidParkUpdateRequest(updatedParkRequest)) {
    res.status(400).send({ msg: "Invalid park details" });
  } else {
    updateParkByID(updatedParkRequest).then((returnedPark) => res.status(200).send(returnedPark))
    .catch(next);
  }
};

export const getUserParks: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  getParksByUserID(user_id)
    .then((returnedParks) => res.status(200).send(returnedParks))
    .catch(next);
};
