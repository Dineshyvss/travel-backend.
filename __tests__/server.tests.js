describe("server", () => {
  const db = jest.mock("../app/models", () => ({
    sequelize: {
      sync: jest.fn(),
    },
    Sequelize: {
      Op: jest.fn(),
    },
  }));

  const app = require("../server.js");
  const request = require("supertest");

  it("responds with welcome message", async () => {
    await request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Welcome to bezkoder application.");
      });
  });
});
