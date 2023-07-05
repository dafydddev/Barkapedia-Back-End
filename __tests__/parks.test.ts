import request from "supertest";
import app from "../app";
import { Park } from "../types/CustomTypes";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());
afterAll(() => seedDatabase());

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
          expect(typeof park.user_id).toBe("string");
          expect(typeof park.name).toBe("string");
          expect(typeof park.desc).toBe("string");
          expect(typeof park.size).toBe("number");
          expect(typeof park.current_average_rating).toBe("number");
          expect(typeof park.current_review_count).toBe("number");
          expect(typeof park.features).toBe("object");
          expect(Array.isArray(park.features)).toBe(false);
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
        expect(typeof park.user_id).toBe("string");
        expect(typeof park.name).toBe("string");
        expect(typeof park.desc).toBe("string");
        expect(typeof park.size).toBe("number");
        expect(typeof park.current_average_rating).toBe("number");
        expect(typeof park.current_review_count).toBe("number");
        expect(typeof park.features).toBe("object");
        expect(Array.isArray(park.features)).toBe(false);
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

describe("POST /api/parks/", () => {
  test("POST /api/parks should return 201 status code when given a valid park", () => {
    const validParkRequest = {
      user_id: "user_2",
      name: "Shelfield Park",
      desc: "A park containing two full-size football pitches, a football and basketball cage, and a children's soft play area.",
      size: 6,
      features: {
        isFree: false,
        isWellLit: false,
        isFreeParking: false,
        isParking: true,
        hasAgilityEquipment: false,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "8am - 5pm",
        tuesday: "8am - 5pm",
        wednesday: "8am - 5pm",
        thursday: "8am - 5pm",
        friday: "8am - 5pm",
        saturday: "8am - 5pm",
        sunday: "8am - 5pm",
      },
      address: {
        firstLine: "29 LEGGE LANE",
        secondLine: "Jewel Court",
        postCode: "B1 3LE",
        city: "Birmingham",
      },
      image_url: "https://www.park.com/",
      website_url: "https://www.parkwebsite.com/",
      phone_number: "07800989434",
    };
    return request(app).post("/api/parks/").send(validParkRequest).expect(201);
  });
  test("POST /api/parks/ should the accept park when given a valid park", () => {
    const validParkRequest = {
      user_id: "user_2",
      name: "Shelfield Park",
      desc: "A park containing two full-size football pitches, a football and basketball cage, and a children's soft play area.",
      size: 6,
      features: {
        isFree: false,
        isWellLit: false,
        isFreeParking: false,
        isParking: true,
        hasAgilityEquipment: false,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "8am - 5pm",
        tuesday: "8am - 5pm",
        wednesday: "8am - 5pm",
        thursday: "8am - 5pm",
        friday: "8am - 5pm",
        saturday: "8am - 5pm",
        sunday: "8am - 5pm",
      },
      address: {
        firstLine: "29 LEGGE LANE",
        secondLine: "Jewel Court",
        postCode: "B1 3LE",
        city: "Birmingham",
      },
      image_url: "https://www.park.com/",
      website_url: "https://www.parkwebsite.com/",
      phone_number: "07800989434",
    };
    return request(app)
      .post("/api/parks/")
      .send(validParkRequest)
      .expect(201)
      .then((response) => {
        const park: Park = response.body;
        expect(typeof park.user_id).toBe("string");
        expect(typeof park.name).toBe("string");
        expect(typeof park.desc).toBe("string");
        expect(typeof park.size).toBe("number");
        expect(typeof park.current_average_rating).toBe("number");
        expect(typeof park.current_review_count).toBe("number");
        expect(typeof park.features).toBe("object");
        expect(Array.isArray(park.features)).toBe(false);
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
        expect(typeof park.location.long).toBe("number");
        expect(typeof park.location.lat).toBe("number");
        expect(typeof park.image_url).toBe("string");
        expect(typeof park.website_url).toBe("string");
        expect(typeof park.phone_number).toBe("string");
      });
  });
  test("POST /api/parks should return 400 status code when given no park", () => {
    return request(app).post("/api/parks/").send().expect(400);
  });
  test("POST /api/parks should return 400 status code when given a park with missing or invalid data", () => {
    const invalidParkMissingName = {
      user_id: "user_2",
      desc: "A park containing two full-size football pitches, a football and basketball cage, and a children's soft play area.",
      size: 6,
      current_average_rating: 4,
      current_review_count: 1,
      features: {
        isFree: false,
        isWellLit: false,
        isFreeParking: false,
        isParking: true,
        hasAgilityEquipment: false,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "8am - 5pm",
        tuesday: "8am - 5pm",
        wednesday: "8am - 5pm",
        thursday: "8am - 5pm",
        friday: "8am - 5pm",
        saturday: "8am - 5pm",
        sunday: "8am - 5pm",
      },
      address: {
        firstLine: "29 LEGGE LANE",
        secondLine: "Jewel Court",
        postCode: "B1 3LE",
        city: "Birmingham",
      },
      location: {
        long: "-1.902585",
        lat: "52.498464",
      },
      image_url: "https://www.park.com/",
      website_url: "https://www.parkwebsite.com/",
      phone_number: "07800989434",
    };
    return request(app)
      .post("/api/parks/")
      .send(invalidParkMissingName)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid park details");
      });
  });
  test("POST /api/parks should return 400 status code when given a park with missing or invalid data", () => {
    const invalidParkInvalidName = {
      user_id: "user_2",
      name: 12,
      desc: "A park containing two full-size football pitches, a football and basketball cage, and a children's soft play area.",
      size: 6,
      current_average_rating: 4,
      current_review_count: 1,
      features: {
        isFree: false,
        isWellLit: false,
        isFreeParking: false,
        isParking: true,
        hasAgilityEquipment: false,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "8am - 5pm",
        tuesday: "8am - 5pm",
        wednesday: "8am - 5pm",
        thursday: "8am - 5pm",
        friday: "8am - 5pm",
        saturday: "8am - 5pm",
        sunday: "8am - 5pm",
      },
      address: {
        firstLine: "29 LEGGE LANE",
        secondLine: "Jewel Court",
        postCode: "B1 3LE",
        city: "Birmingham",
      },
      location: {
        long: "-1.902585",
        lat: "52.498464",
      },
      image_url: "https://www.park.com/",
      website_url: "https://www.parkwebsite.com/",
      phone_number: "07800989434",
    };
    return request(app)
      .post("/api/parks/")
      .send(invalidParkInvalidName)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid park details");
      });
  });
});

describe("GET /api/parks/:user_id/users", () => {
  test("GET /api/parks/:user_id/users should return 200 status code", () => {
    return request(app).get("/api/parks/user_1/users").expect(200);
  });
  test("GET /api/parks/:user_id/users should return an an array of objects that matches the test data", () => {
    return request(app)
      .get("/api/parks/user_1/users")
      .expect(200)
      .then((response) => {
        const parksArray = response.body;
        parksArray.forEach((park: Park) => {
          expect(typeof park.user_id).toBe("string");
          expect(park.user_id).toBe("user_1");
          expect(typeof park.name).toBe("string");
          expect(typeof park.desc).toBe("string");
          expect(typeof park.size).toBe("number");
          expect(typeof park.current_average_rating).toBe("number");
          expect(typeof park.current_review_count).toBe("number");
          expect(typeof park.features).toBe("object");
          expect(Array.isArray(park.features)).toBe(false);
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

describe("PATCH /api/parks/:park_id", () => {
  test("PATCH /api/parks/:id should return 200 status code when given a valid park patch request", () => {
    const validParkPatchRequest = {
      name: "Updated park name",
      desc: "Updated park description",
      size: 2,
      features: {
        isFree: true,
        isWellLit: true,
        isFreeParking: true,
        isParking: true,
        hasAgilityEquipment: true,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "9am - 6pm",
        tuesday: "9am - 6pm",
        wednesday: "9am - 6pm",
        thursday: "9am - 6pm",
        friday: "9am - 6pm",
        saturday: "9am - 6pm",
        sunday: "9am - 6pm",
      },
      address: {
        firstLine: "Updated address first line",
        secondLine: "Updated address second line",
        postCode: "B2 4LE",
        city: "Birmingham",
      },
      image_url: "https://www.updatedpark.com/",
      website_url: "https://www.updatedparkwebsite.com/",
      phone_number: "07800989435",
    };
    return request(app)
      .patch("/api/parks/park_1")
      .send(validParkPatchRequest)
      .expect(200);
  });
  test("PATCH /api/parks/:id should return a park that has been correctly updated", () => {
    const validParkPatchRequest = {
      name: "Updated park name",
      desc: "Updated park description",
      size: 2,
      features: {
        isFree: true,
        isWellLit: true,
        isFreeParking: true,
        isParking: true,
        hasAgilityEquipment: true,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "9am - 6pm",
        tuesday: "9am - 6pm",
        wednesday: "9am - 6pm",
        thursday: "9am - 6pm",
        friday: "9am - 6pm",
        saturday: "9am - 6pm",
        sunday: "9am - 6pm",
      },
      address: {
        firstLine: "Updated address first line",
        secondLine: "Updated address second line",
        postCode: "B2 4LE",
        city: "Birmingham",
      },
      image_url: "https://www.updatedpark.com/",
      website_url: "https://www.updatedparkwebsite.com/",
      phone_number: "07800989435",
    };
    const expectedResponse = {
      user_id: "user_1",
      name: "Updated park name",
      desc: "Updated park description",
      features: {
        isFree: true,
        isWellLit: true,
        isFreeParking: true,
        isParking: true,
        hasAgilityEquipment: true,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      current_average_rating: 4,
      address: {
        firstLine: "Updated address first line",
        secondLine: "Updated address second line",
        postCode: "B2 4LE",
        city: "Birmingham",
      },
      size: 2,
      image_url: "https://www.updatedpark.com/",
      website_url: "https://www.updatedparkwebsite.com/",
      opening_hours: {
        monday: "9am - 6pm",
        tuesday: "9am - 6pm",
        wednesday: "9am - 6pm",
        thursday: "9am - 6pm",
        friday: "9am - 6pm",
        saturday: "9am - 6pm",
        sunday: "9am - 6pm",
      },
      current_review_count: 1,
      location: {
        lat: 52.4787781,
        long: -1.8953186,
      },
      phone_number: "07800989435",
    };
    return request(app)
      .patch("/api/parks/park_1")
      .send(validParkPatchRequest)
      .expect(200)
      .then((response) => {
        const park = response.body;
        expect(park).toEqual(expectedResponse);
      });
  });
  test("PATCH /api/parks/:id should return 404 status code when given a park that does not exist", () => {
    const validParkPatchRequest = {
      name: "Updated park name",
      desc: "Updated park description",
      size: 2,
      features: {
        isFree: true,
        isWellLit: true,
        isFreeParking: true,
        isParking: true,
        hasAgilityEquipment: true,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "9am - 6pm",
        tuesday: "9am - 6pm",
        wednesday: "9am - 6pm",
        thursday: "9am - 6pm",
        friday: "9am - 6pm",
        saturday: "9am - 6pm",
        sunday: "9am - 6pm",
      },
      address: {
        firstLine: "Updated address first line",
        secondLine: "Updated address second line",
        postCode: "B2 4LE",
        city: "Birmingham",
      },
      image_url: "https://www.updatedpark.com/",
      website_url: "https://www.updatedparkwebsite.com/",
      phone_number: "07800989435",
    };
    return request(app)
      .patch("/api/parks/park_999")
      .send(validParkPatchRequest)
      .expect(404)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("No park found with park_id: park_999");
      });
  });
  test("PATCH /api/parks/:id should return 400 status code when given an invalid park request", () => {
    const invalidParkPatchRequest = {
      name: 100,
      desc: "Updated park description",
      size: 2,
      features: {
        isFree: true,
        isWellLit: true,
        isFreeParking: true,
        isParking: true,
        hasAgilityEquipment: true,
        isFullyEnclosed: true,
        hasDisabledAccess: true,
      },
      opening_hours: {
        monday: "9am - 6pm",
        tuesday: "9am - 6pm",
        wednesday: "9am - 6pm",
        thursday: "9am - 6pm",
        friday: "9am - 6pm",
        saturday: "9am - 6pm",
        sunday: "9am - 6pm",
      },
      address: {
        firstLine: "Updated address first line",
        secondLine: "Updated address second line",
        postCode: "B2 4LE",
        city: "Birmingham",
      },
      image_url: "https://www.updatedpark.com/",
      website_url: "https://www.updatedparkwebsite.com/",
      phone_number: "07800989435",
    };
    return request(app)
      .patch("/api/parks/park_999")
      .send(invalidParkPatchRequest)
      .expect(400);
  });
});
