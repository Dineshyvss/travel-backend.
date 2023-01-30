describe("tutorial controller", () => {
  const mockFindAllFunction = jest.fn().mockResolvedValue(Promise.resolve([]));
  const mockFindByPkFunction = jest.fn().mockResolvedValue(Promise.resolve([]));
  jest.mock("../../app/models", () => ({
    sequelize: {
      sync: jest.fn(),
    },
    Sequelize: {
      Op: {
        like: jest.fn().mockImplementation(() => true),
      },
    },
    tutorial: {
      findAll: mockFindAllFunction,
      findByPk: mockFindByPkFunction,
    },
  }));
  const db = require("../../app/models");
  const authFunction = jest.fn().mockImplementation((req, res, next) => next());
  const authenticate = jest.mock(
    "../../app/authorization/authorization.js",
    () => ({
      authenticate: authFunction,
    })
  );

  const app = require("../../server.js");
  const request = require("supertest");

  var testTutorial = {
    title: "Automated Testing Tutorial",
    description:
      "This tutorial shows an example test suite of a NodeJS backend",
    published: false,
    userId: 1,
  };

  describe("get tutorials list", () => {
    it("authenticates the user", async () => {
      mockFindAllFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials")
        .then((response) => {
          expect(authFunction).toHaveBeenCalled();
        });
    });

    it("calls findAll without query", async () => {
      mockFindAllFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials")
        .expect(200)
        .then((response) => {
          expect(mockFindAllFunction).toHaveBeenCalled();
        });
    });

    it("calls findAll with query", async () => {
      mockFindAllFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials?title=Automated")
        .expect(200)
        .then((response) => {
          expect(mockFindAllFunction).toHaveBeenCalledWith({
            where: {
              title: {
                [db.Sequelize.Op.like]: "%Automated%",
              },
            },
          });
        });
    });

    it("responds with results from findAll", async () => {
      mockFindAllFunction.mockResolvedValue(Promise.resolve([testTutorial]));
      await request(app)
        .get("/tutorial/tutorials")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject(testTutorial);
        });
    });

    it("responds with 500 and message on error", async () => {
      mockFindAllFunction.mockImplementation(() =>
        Promise.reject(new Error("Fake error from test"))
      );
      await request(app)
        .get("/tutorial/tutorials")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });
  });

  describe("find all tutorials for a user", () => {
    it("authenticates the user", async () => {
      mockFindAllFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials/userTut/1")
        .then((response) => {
          expect(authFunction).toHaveBeenCalled();
        });
    });

    it("calls findAllForUser", async () => {
      mockFindAllFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials/userTut/1")
        .expect(200)
        .then((response) => {
          expect(mockFindAllFunction).toHaveBeenCalledWith({
            where: {
              userId: "1",
            },
          });
        });
    });

    it("responds with results from findAllForUser", async () => {
      mockFindAllFunction.mockResolvedValue(
        await Promise.resolve([testTutorial])
      );
      await request(app)
        .get("/tutorial/tutorials/userTut/1")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject(testTutorial);
        });
    });

    it("responds with 500 and message on error", async () => {
      mockFindAllFunction.mockImplementation(() =>
        Promise.reject(new Error("Fake error from test"))
      );
      await request(app)
        .get("/tutorial/tutorials/userTut/1")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });
  });

  describe("find a tutorial by its id", () => {
    it("authenticates the user", async () => {
      mockFindByPkFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials/1")
        .then((response) => {
          expect(authFunction).toHaveBeenCalled();
        });
    });

    it("calls findOne", async () => {
      mockFindByPkFunction.mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/tutorial/tutorials/1")
        .expect(200)
        .then((response) => {
          expect(mockFindByPkFunction).toHaveBeenCalledWith("1");
        });
    });

    it("responds with results from findOne", async () => {
      mockFindByPkFunction.mockResolvedValue(
        await Promise.resolve([testTutorial])
      );
      await request(app)
        .get("/tutorial/tutorials/1")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject(testTutorial);
        });
    });

    it("responds with 500 and message on error", async () => {
      mockFindByPkFunction.mockImplementation(() =>
        Promise.reject(new Error("Fake error from test"))
      );
      await request(app)
        .get("/tutorial/tutorials/1")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });
  });
});
