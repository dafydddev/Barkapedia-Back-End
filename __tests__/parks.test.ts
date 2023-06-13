import request from "supertest";
import app from "../app";
import { Park } from "../types/CustomTypes";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());

describe("GET /api/parks", () => {
  test("GET /api/parks should return 200 status code", () => {
    return request(app).get("/api/parks").expect(200);
  });
  test("GET /api/parks should return an an array of objects that matches the test data", () => {
    return request(app)
      .get("/api/parks")
      .expect(200)
      .then((response) => {
        const parksArray = response.body;
        parksArray.forEach((park: Park) => {
          expect(typeof park.name).toBe("string");
          expect(typeof park.desc).toBe("string");
          expect(typeof park.size).toBe("number");
          expect(typeof park.current_average_rating).toBe("number");
          expect(typeof park.current_review_count).toBe("number");
          expect(Array.isArray(park.features)).toBe(true);
          expect(typeof park.opening_hours).toBe("object");
          expect(typeof park.opening_hours.monday).toBe("string");
          expect(typeof park.opening_hours.tuesday).toBe("string");
          expect(typeof park.opening_hours.wednesday).toBe("string");
          expect(typeof park.opening_hours.thursday).toBe("string");
          expect(typeof park.opening_hours.friday).toBe("string");
          expect(typeof park.opening_hours.saturday).toBe("string");
          expect(typeof park.opening_hours.sunday).toBe("string");
          expect(typeof park.address).toBe("object");
          expect(typeof park.address.firstLine).toBe("string");
          expect(typeof park.address.secondLine).toBe("string");
          expect(typeof park.address.postCode).toBe("string");
          expect(typeof park.address.city).toBe("string");
          expect(typeof park.location).toBe("object");
          expect(typeof park.location.long).toBe("string");
          expect(typeof park.location.lat).toBe("string");
          expect(typeof park.image_url).toBe("string");
          expect(typeof park.website_url).toBe("string");
          expect(typeof park.phone_number).toBe("string");
        });
      });
  });
});

describe("GET /api/parks/:park_id", () => {
  test("GET /api/parks/:park_id should return 200 status code", () => {
    return request(app).get("/api/parks/park_1").expect(200);
  });
  test("GET /api/parks/:park_id should return an an array of objects that matches the test data", () => {
    return request(app)
      .get("/api/parks/park_1")
      .expect(200)
      .then((response) => {
        const park: Park = response.body;
        expect(typeof park.name).toBe("string");
        expect(typeof park.desc).toBe("string");
        expect(typeof park.size).toBe("number");
        expect(typeof park.current_average_rating).toBe("number");
        expect(typeof park.current_review_count).toBe("number");
        expect(Array.isArray(park.features)).toBe(true);
        expect(typeof park.opening_hours).toBe("object");
        expect(typeof park.opening_hours.monday).toBe("string");
        expect(typeof park.opening_hours.tuesday).toBe("string");
        expect(typeof park.opening_hours.wednesday).toBe("string");
        expect(typeof park.opening_hours.thursday).toBe("string");
        expect(typeof park.opening_hours.friday).toBe("string");
        expect(typeof park.opening_hours.saturday).toBe("string");
        expect(typeof park.opening_hours.sunday).toBe("string");
        expect(typeof park.address).toBe("object");
        expect(typeof park.address.firstLine).toBe("string");
        expect(typeof park.address.secondLine).toBe("string");
        expect(typeof park.address.postCode).toBe("string");
        expect(typeof park.address.city).toBe("string");
        expect(typeof park.location).toBe("object");
        expect(typeof park.location.long).toBe("string");
        expect(typeof park.location.lat).toBe("string");
        expect(typeof park.image_url).toBe("string");
        expect(typeof park.website_url).toBe("string");
        expect(typeof park.phone_number).toBe("string");
      });
  });
});