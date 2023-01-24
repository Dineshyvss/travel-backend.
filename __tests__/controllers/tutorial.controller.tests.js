//mock out database model
const db = require("../../app/models");
db.tutorial = {};

const app = require("../../server.js");
const request = require("supertest");

describe("tutorials controller", () => {
  var testTutorial = {
    title: "Automated Testing Tutorial",
    description:
      "This tutorial shows an example test suite of a NodeJS backend",
    published: false,
  };

  describe("get tutorials list", () => {
    it("calls findAll without query", async () => {
      db.tutorial.findAll = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/api/tutorials")
        .expect(200)
        .then((response) => {
          expect(db.tutorial.findAll).toHaveBeenCalled();
        });
    });

    it("calls findAll with query", async () => {
      db.tutorial.findAll = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/api/tutorials?title=Automated")
        .expect(200)
        .then((response) => {
          expect(db.tutorial.findAll).toHaveBeenCalledWith({
            where: {
              title: {
                [db.Sequelize.Op.like]: "%Automated%",
              },
            },
          });
        });
    });

    it("responds with results from findAll", async () => {
      db.tutorial.findAll = jest
        .fn()
        .mockResolvedValue(Promise.resolve([testTutorial]));
      await request(app)
        .get("/api/tutorials")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject(testTutorial);
        });
    });

    it("responds with 500 and message on error", async () => {
      db.tutorial.findAll = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .get("/api/tutorials")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });
  });
});
