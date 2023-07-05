import request from "supertest";
import app from "../app";
import userData from "../db/data/test-data/users.json";
import { User, UserRequest } from "../types/CustomTypes";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());
afterAll(() => seedDatabase());

describe("GET /api/users", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("should return an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((user: User) => {
          expect(typeof user.id).toBe("string");
          expect(typeof user.username).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(typeof user.type).toBe("string");
          expect(typeof user.isVerified).toBe("boolean");
          expect(typeof user.reviewUpvotes).toBe("number");
        });
      });
  });
});

describe("GET /api/users/:users_id", () => {
  test("GET /api/users/:users_id should return 200 status code", () => {
    return request(app).get("/api/users/user_1").expect(200);
  });
  test("GET /api/users/:user_id should return an object that matches the shape of a user", () => {
    return request(app)
      .get("/api/users/user_1")
      .expect(200)
      .then((response) => {
        const user: User = response.body;
        expect(typeof user.username).toBe("string");
        expect(typeof user.email).toBe("string");
        expect(typeof user.type).toBe("string");
        expect(typeof user.isVerified).toBe("boolean");
        expect(typeof user.reviewUpvotes).toBe("number");
      });
  });
});

describe("POST /api/users/", () => {
  test("POST /api/users/ should return the accepted user when given a valid user", () => {
    const validUserRequest: UserRequest = {
      email: "joe@example.com",
      username: "joe123",
      password: "123abc",
      type: "consumer",
    };
    const expectUserResponse: User = {
      id: `user_${userData.length + 1}`,
      email: "joe@example.com",
      username: "joe123",
      type: "consumer",
      isVerified: false,
      reviewUpvotes: 0,
    };
    return request(app)
      .post("/api/users/")
      .send(validUserRequest)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expectUserResponse);
      });
  });
  test("POST /api/users should return 400 status code when given no user", () => {
    return request(app).post("/api/users/").send().expect(400);
  });
  test("POST /api/users should return 400 status code when given a user with missing", () => {
    const missingEmailUserInput = {
      username: "CoolGuy69",
      password: "123BLAH",
      type: "consumer",
    };
    return request(app)
      .post("/api/users/")
      .send(missingEmailUserInput)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid user details");
      });
  });
  test("POST /api/users should return 400 status code when given a user with invalid data", () => {
    const invalidTypelUserInput = {
      email: "bppppp@example.com",
      username: "CoolGuy69",
      password: "123BLAH",
      type: 12,
    };
    return request(app)
      .post("/api/users/")
      .send(invalidTypelUserInput)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid user details");
      });
  });
});
