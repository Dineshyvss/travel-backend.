# Automated Testing

#### Written by Emily Pielemeier

## Set up first tests

These steps are adapted from https://jestjs.io/docs/getting-started

1. Install Jest

```bash
npm install jest
```

2. Configure `package.json` to support `npm test`:

```json
"scripts": {
  "test": "jest"
}
```

3. Run `npm test`. There should be a warning that there are no tests.
4. Create `app/sum.js` and `__tests__/sum.test.js`

- Copy from https://jestjs.io/docs/getting-started
- Update require path on line 1 to `require(''../app/sum.js')`

5. Run `npm test`. The test should pass.
6. Copy the below edge case test to `__tests__/sum.test.js`

```js
test('throws an error for 1 + hello', () => {
  expect(() => sum(1, 'hello'))).toThrowError('hello is not a number!');
});

test('throws an error for hello + 1', () => {
  expect(() => sum('hello', 1))).toThrowError('hello is not a number!');
});
```

- Notice the extra function inside of expect. This is necessary to [test thrown errors](https://jestjs.io/docs/expect#tothrowerror).

7. Run `npm test`. The 2 new tests should fail.
8. Update `sum.js`:

```js
function sum(a, b) {
  if (typeof a !== "number") {
    throw a + " is not a number!";
  }
  if (typeof b !== "number") {
    throw b + " is not a number!";
  }
  return a + b;
}
```

9. Run`npm test`. All 3 tests should pass.

## Set up controller tests

1. Install supertest

```bash
npm install supertest
```

2. Create `/__tests__/server.tests.js` with the following

```js
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
```

3. Run `npm test`. All tests should pass.
4. Create `/__tests__/controllers/tutorial.controller.tests.js` with the following test coverage for getting a list of tutorials

```js
// mock out Sequelize
const sequelize = jest.mock("sequelize");
//mock out database model
const db = require("../../app/models");
db.tutorials = {};

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
      db.tutorials.findAll = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/api/tutorials")
        .expect(200)
        .then((response) => {
          expect(db.tutorials.findAll).toHaveBeenCalled();
        });
    });

    it("calls findAll with query", async () => {
      db.tutorials.findAll = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/api/tutorials?title=Automated")
        .expect(200)
        .then((response) => {
          expect(db.tutorials.findAll).toHaveBeenCalledWith({
            where: {
              title: {
                [db.Sequelize.Op.like]: "%Automated%",
              },
            },
          });
        });
    });

    it("responds with results from findAll", async () => {
      db.tutorials.findAll = jest
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
      db.tutorials.findAll = jest
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
```

5. Run `npm test`. All tests should pass.
6. With the documentation below and the examples so far write additional tests for the tutorials controller. All tests should pass when you are complete.

# Documentation

- [Jest Expectations](https://jestjs.io/docs/expect)
- [Jest Mocks](https://jestjs.io/docs/mock-functions)
- [Supertest Expectations](https://github.com/visionmedia/supertest#example)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
