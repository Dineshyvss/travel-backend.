describe("database wrapper", () => {
  const dbConfig = require("../app/config/db.config.js");
  const Sequelize = require("sequelize");
  jest.mock("sequelize");

  //mock out sequelize functions on database models
  const user = jest.mock("../app/models/user.model.js", () =>
    jest.fn().mockReturnValue({
      hasMany: jest.fn(),
    })
  );
  const session = jest.mock("../app/models/session.model.js", () =>
    jest.fn().mockReturnValue({
      belongsTo: jest.fn(),
    })
  );
  const tutorial = jest.mock("../app/models/tutorial.model.js", () =>
    jest.fn().mockReturnValue({
      hasMany: jest.fn(),
      belongsTo: jest.fn(),
    })
  );
  const lesson = jest.mock("../app/models/lesson.model.js", () =>
    jest.fn().mockReturnValue({
      belongsTo: jest.fn(),
    })
  );

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
