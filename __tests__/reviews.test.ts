import request from "supertest";
import app from "../app";
import { Review } from "../types/CustomTypes";
import reviewData from "../db/data/test-data/reviews.json";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());
afterAll(() => seedDatabase());

describe("GET /api/reviews", () => {
  test("GET /api/reviews should return 200 status code", () => {
    return request(app).get(`/api/reviews`).expect(200);
  });
  test("GET /api/reviews should return a review of the correct shape", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        reviewsArray.forEach((review: Review) => {
          expect(typeof review.park_id).toBe("string");
          expect(typeof review.user_id).toBe("string");
          expect(typeof review.rating).toBe("number");
          expect(typeof review.title).toBe("string");
          expect(typeof review.body).toBe("string");
          expect(typeof review.votes).toBe("number");
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("GET /api/reviews/:review_id should return 200 status code", () => {
    return request(app).get(`/api/reviews/review_1`).expect(200);
  });
  test("GET /api/reviews/:review_id should return a review of the correct shape", () => {
    return request(app)
      .get("/api/reviews/review_1")
      .expect(200)
      .then((response) => {
        const review = response.body;
        expect(typeof review.park_id).toBe("string");
        expect(typeof review.user_id).toBe("string");
        expect(typeof review.rating).toBe("number");
        expect(typeof review.title).toBe("string");
        expect(typeof review.body).toBe("string");
        expect(typeof review.votes).toBe("number");
      });
  });
  test("GET /api/reviews/:review_id should return an empty array when given an review id that does not exist", () => {
    return request(app)
      .get("/api/reviews/review_abc")
      .expect(404)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("No review found for review_id: review_abc");
      });
  });
});

describe("GET /api/reviews/:park_id/parks", () => {
  test("GET /api/reviews/:park_id/parks should return 200 status code", () => {
    return request(app).get(`/api/reviews/park_1/parks`).expect(200);
  });
  test("GET /api/reviews/park_1/parks/ should return a review of the correct shape", () => {
    return request(app)
      .get("/api/reviews/park_1/parks")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        expect(reviewsArray.length > 0).toBe(true);
        reviewsArray.forEach((review: Review) => {
          expect(typeof review.park_id).toBe("string");
          expect(typeof review.user_id).toBe("string");
          expect(typeof review.rating).toBe("number");
          expect(typeof review.title).toBe("string");
          expect(typeof review.body).toBe("string");
          expect(typeof review.votes).toBe("number");
        });
      });
  });
  test("GET /api/reviews/park_1/parks should return an empty array when given a park id that has no reviews", () => {
    return request(app)
      .get("/api/reviews/park_abc/parks")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        expect(reviewsArray).toEqual([]);
      });
  });
});

describe("POST /api/reviews/", () => {
  test("POST /api/reviews should return 201 status code when given a valid review request", () => {
    const validReviewRequest = {
      park_id: "park_8",
      user_id: "user_8",
      rating: 4,
      safety: 4,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
    };
    return request(app)
      .post("/api/reviews/")
      .send(validReviewRequest)
      .expect(201);
  });
  test("POST /api/reviews/ should accepted the review when given a review park", () => {
    const requestInput = {
      park_id: "park_8",
      user_id: "user_8",
      rating: 4,
      safety: 4,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
    };
    const expectedOutput = {
      id: `review_${reviewData.length + 1}`,
      park_id: "park_8",
      user_id: "user_8",
      rating: 4,
      safety: 4,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
      votes: 0,
    };
    return request(app)
      .post("/api/reviews/")
      .send(requestInput)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expectedOutput);
      });
  });
  test("POST /api/reviews/ should update the score and review count when the park has no reviews", () => {
    const requestInput = {
      park_id: "park_8",
      user_id: "user_8",
      rating: 5,
      safety: 5,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
    };
    const expectedOutput = {
      id: `review_${reviewData.length + 1}`,
      park_id: "park_8",
      user_id: "user_8",
      rating: 5,
      safety: 5,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
      votes: 0,
    };
    return request(app)
      .post("/api/reviews/")
      .send(requestInput)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expectedOutput);
        return request(app).get("/api/parks/park_8");
      })
      .then((response) => {
        const parkResponse = response.body;
        expect(parkResponse.current_review_count).toBe(1);
        expect(parkResponse.current_average_rating).toBe(5);
      });
  });
  test("POST /api/reviews/ should update the score and review count when the park has more than review", () => {
    const requestInput = {
      park_id: "park_9",
      user_id: "user_8",
      rating: 1,
      safety: 1,
      AsDescribed: true,
      title: "Awful scenery",
      body: "The park offers terrible views and is a bad spot for photography.",
    };
    const expectedOutput = {
      id: `review_${reviewData.length + 1}`,
      park_id: "park_9",
      user_id: "user_8",
      rating: 1,
      safety: 1,
      AsDescribed: true,
      title: "Awful scenery",
      body: "The park offers terrible views and is a bad spot for photography.",
      votes: 0,
    };
    return request(app)
      .post("/api/reviews/")
      .send(requestInput)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expectedOutput);
        return request(app).get("/api/parks/park_9");
      })
      .then((response) => {
        const parkResponse = response.body;
        expect(parkResponse.current_review_count).toBe(6);
        expect(parkResponse.current_average_rating).toBe(3);
      });
  });
  test("POST /api/reviews should return 400 status code when given no park", () => {
    return request(app).post("/api/reviews/").send().expect(400);
  });
  test("POST /api/reviews should return 400 status code when given a park with missing data", () => {
    const missingRating = {
      park_id: "park_8",
      user_id: "user_8",
      safety: 4,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
    };
    return request(app)
      .post("/api/reviews/")
      .send(missingRating)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review details");
      });
  });
  test("POST /api/reviews should return 400 status code when given invalid data", () => {
    const invalidRating = {
      park_id: "park_8",
      user_id: "user_8",
      rating: "Hello World",
      safety: 4,
      AsDescribed: true,
      title: "Beautiful scenery",
      body: "The park offers breathtaking views and is a great spot for photography.",
    };
    return request(app)
      .post("/api/reviews/")
      .send(invalidRating)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review details");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("PATCH /api/reviews/:review_id should return 200 status code", () => {
    const validUpdate = {
      rating: 5,
      safety: 5,
      AsDescribed: true,
      title: "Great",
      body: "A lovely park",
    };
    return request(app)
      .patch(`/api/reviews/review_1`)
      .send(validUpdate)
      .expect(200);
  });
  test("PATCH /api/reviews should return a review of the correct shape", () => {
    const validUpdate = {
      rating: 5,
      safety: 5,
      AsDescribed: true,
      title: "Great",
      body: "A lovely park",
    };
    return request(app)
      .patch("/api/reviews/review_1")
      .send(validUpdate)
      .expect(200)
      .then((response) => {
        const review = response.body;
        expect(typeof review.user_id).toBe("string");
        expect(typeof review.park_id).toBe("string");
        expect(typeof review.rating).toBe("number");
        expect(typeof review.safety).toBe("number");
        expect(typeof review.AsDescribed).toBe("boolean");
        expect(typeof review.title).toBe("string");
        expect(typeof review.body).toBe("string");
        expect(typeof review.votes).toBe("number");
      });
  });
  test("PATCH /api/reviews should return a review with correct updates", () => {
    const validUpdate = {
      rating: 5,
      safety: 5,
      AsDescribed: true,
      title: "Great",
      body: "A lovely park",
    };
    return request(app)
      .patch("/api/reviews/review_1")
      .send(validUpdate)
      .expect(200)
      .then((response) => {
        const review = response.body;
        expect(review.rating).toBe(5);
        expect(review.safety).toBe(5);
        expect(review.AsDescribed).toBe(true);
        expect(review.title).toBe("Great");
        expect(review.body).toBe("A lovely park");
      });
  });
  test("PATCH /api/reviews should reject the update when it is missing a property", () => {
    const invalidUpdateMissingTitle = {
      rating: 5,
      safety: 5,
      AsDescribed: true,
      body: "A lovely park",
    };
    return request(app)
      .patch("/api/reviews/review_1")
      .send(invalidUpdateMissingTitle)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review details");
      });
  });
  test("PATCH /api/reviews should reject the update when it is has invalid values", () => {
    const invalidUpdateBadRating = {
      rating: "Hello",
      safety: 5,
      AsDescribed: true,
      title: "Great",
      body: "A lovely park",
    };
    return request(app)
      .patch("/api/reviews/review_1")
      .send(invalidUpdateBadRating)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review details");
      });
  });
});

describe("PATCH /api/reviews/:review_id/votes", () => {
  test("PATCH /api/reviews/:review_id/votes should return 200 status code", () => {
    const voteUpdateByPlusOne = {
      increment: 1,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByPlusOne)
      .expect(200);
  });
  test("PATCH /api/reviews/:review_id/votes should support updating the votes by 1", () => {
    const voteUpdateByPlusOne = {
      increment: 1,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByPlusOne)
      .expect(200)
      .then((response) => {
        expect(response.body.votes).toBe(4);
      });
  });
  test("PATCH /api/reviews/:review_id/votes should support updating the votes by -1", () => {
    const voteUpdateByMinusOne = {
      increment: -1,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByMinusOne)
      .expect(200)
      .then((response) => {
        expect(response.body.votes).toBe(2);
      });
  });
  test("PATCH /api/reviews/:review_id/votes should reject updating the votes by other numbers", () => {
    const voteUpdateByMinusZero = {
      increment: 0,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByMinusZero)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review vote details");
      });
  });
  test("PATCH /api/reviews/:review_id/votes should reject updating the votes by other numbers", () => {
    const voteUpdateByMinusTwo = {
      increment: -2,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByMinusTwo)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review vote details");
      });
  });
  test("PATCH /api/reviews/:review_id/votes should reject updating the votes by other numbers", () => {
    const voteUpdateByPlusTwo = {
      increment: 2,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByPlusTwo)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review vote details");
      });
  });
  test("PATCH /api/reviews/:review_id/votes should reject updating the votes by other data formats", () => {
    const voteUpdateByString = {
      increment: "hello",
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByString)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review vote details");
      });
  });
  test("PATCH /api/reviews/:review_id/votes should add to the users upvote count", () => {
    const voteUpdateByPlusOne = {
      increment: 1,
    };
    return request(app)
      .get("/api/users/user_1")
      .expect(200)
      .then((response) => {
        const userUpvotesOriginal = response.body.reviewUpvotes;
        return request(app)
          .patch(`/api/reviews/review_1/votes`)
          .send(voteUpdateByPlusOne)
          .expect(200)
          .then(() => {
            return request(app)
              .get("/api/users/user_1")
              .expect(200)
              .then((response) => {
                const userUpvotesUpdated = response.body.reviewUpvotes;
                expect(userUpvotesUpdated).toBe(userUpvotesOriginal + 1);
              });
          });
      });
  });
  test("PATCH /api/reviews/:review_id/votes should reduce to the users upvote count", () => {
    const voteUpdateByMinusOne = {
      increment: -1,
    };
    return request(app)
      .get("/api/users/user_1")
      .expect(200)
      .then((response) => {
        const userUpvotesOriginal = response.body.reviewUpvotes;
        return request(app)
          .patch(`/api/reviews/review_1/votes`)
          .send(voteUpdateByMinusOne)
          .expect(200)
          .then(() => {
            return request(app)
              .get("/api/users/user_1")
              .expect(200)
              .then((response) => {
                const userUpvotesUpdated = response.body.reviewUpvotes;
                expect(userUpvotesUpdated).toBe(userUpvotesOriginal - 1);
              });
          });
      });
  });
  test("PATCH /api/reviews/:review_id/votes should set the verified status", () => {
    const voteUpdateByPlusOne = {
      increment: 1,
    };
    return request(app)
      .patch(`/api/reviews/review_1/votes`)
      .send(voteUpdateByPlusOne)
      .expect(200)
      .then(() => {
        return request(app)
          .get("/api/users/user_1")
          .expect(200)
          .then((response) => {
            const userVerifiedStatus = response.body.isVerified;
            expect(userVerifiedStatus).toBe(true);
          });
      });
  });
  test("PATCH /api/reviews/:review_id/votes should remove the verified status", () => {
    const voteUpdateByMinusOne = {
      increment: -1,
    };
    return request(app)
      .patch(`/api/reviews/review_3/votes`)
      .send(voteUpdateByMinusOne)
      .expect(200)
      .then(() => {
        return request(app)
          .get("/api/users/user_2")
          .expect(200)
          .then((response) => {
            const userVerifiedStatus = response.body.isVerified;
            expect(userVerifiedStatus).toBe(false);
          });
      });
  });
});
