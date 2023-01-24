const dbConfig = require("../app/config/db.config.js");
const Sequelize = require("sequelize");
jest.mock("sequelize");

describe("database wrapper", () => {
  beforeEach(() => {
    Sequelize.mockClear();
  });

  it("exports an instance of sequelize", () => {
    expect(Sequelize).not.toHaveBeenCalled();
    require("../app/models/index.js");
    expect(Sequelize).toHaveBeenCalledWith(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle,
        },
      }
    );
  });
});
