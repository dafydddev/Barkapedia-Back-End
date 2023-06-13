import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";
import { Park } from "../types/CustomTypes";

beforeEach(() => seedDatabase());

describe("GET /api/ non-existent endpoint", () => {
  test("GET /api/{non-existent endpoint} should return 404 status code", () => {
    return request(app).get("/api/sdfjksfjl").expect(404);
  });
});

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


describe.only("GET /api/users", () => {
test('should return a 200 status code', () => {
  return request(app).get('/api/users').expect(200)
});
test('should return an array of user objects', () => {
  return request(app).get('/api/users').expect(200).then(({body})=>{
    expect(Array.isArray(body)).toBe(true);
    body.forEach((user:User) => {
      expect(typeof user.id).toBe('string');
      expect(typeof user.username).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.type).toBe('string');
      expect(typeof user.isVerified).toBe('boolean');
      expect(typeof user.reviewUpvotes).toBe('number');
    });
  })
});
})


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

