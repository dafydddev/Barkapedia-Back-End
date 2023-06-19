import request from "supertest";
import app from "../app";
import endpointJSON from "../endpoints.json";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());

describe("GET /api", () => {
  test("GET /api should return 200 status code", () => {
    return request(app).get("/api").expect(200);
  });
  test("GET /api should return an object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });
  test("GET /api should return an object the current endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endpointObject = response.body;
        expect(endpointObject).toEqual(endpointJSON);
      });
  });
});
