// mock out Sequelize
const sequelize = jest.mock("sequelize");

const app = require("../server.js");
const request = require("supertest");

describe("server", () => {
  it("responds with welcome message", async () => {
    await request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Welcome to bezkoder application.");
      });
  });
});
