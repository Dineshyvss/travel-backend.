const db = require("../models");
const { hashPassword } = require("./crypto");
const Session = db.session;
const User = db.user;

/**
 * Gets the authentication for this request. Throws an error if there is an authentcation problem.
 * If require is false, makes authentication optional.
 * If require is a string, enforces a specific type of authentication (credentials or token).
 * @return {{type: string, userId: string}}
 */
authenticate = async (req, require = true) => {
  let auth = req.get("authorization");
  console.log(auth);
  if (auth != null) {
    if (
      auth.startsWith("Basic ") &&
      (typeof require !== "string" || require === "credentials")
    ) {
      let credentials = auth.slice(6);
      credentials = Buffer.from(credentials, "base64").toString("utf8");
      let i = credentials.indexOf(":");
      let email = credentials.slice(0, i);
      let password = credentials.slice(i + 1);
      let user = {};
      await User.findAll({ where: { email: email } })
        .then((data) => {
          user = data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      if (user != null) {
        let hash = await hashPassword(password, user.salt);
        if (Buffer.compare(user.password, hash) !== 0) {
          throw Error(req, {
            status: 401,
            code: "invalid-password",
            message: "Invalid password.",
            data: email,
          });
        }
        return {
          type: "credentials",
          userId: user.id,
        };
      } else {
        throw Error(req, {
          status: 401,
          code: "missing-user",
          message: "User not found.",
          data: username,
        });
      }
    }
    if (
      auth.startsWith("Bearer ") &&
      (typeof require !== "string" || require === "token")
    ) {
      let token = auth.slice(7);
      let { sessionId } = await decrypt(token);
      let session = {};
      await Session.findAll({ where: { id: sessionId } })
        .then((data) => {
          session = data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      if (session != null) {
        if (session.expirationDate >= Date.now()) {
          return {
            type: "token",
            userId: session.userId,
            sessionId: session.id,
          };
        } else {
          throw Error(req, {
            status: 401,
            code: "expired-session",
            message: "Session has expired",
          });
        }
      } else {
        throw Error(req, {
          status: 401,
          code: "invalid-session",
          message: "Invalid session",
        });
      }
    }
  }
  if (require) {
    throw Error(req, {
      status: 401,
      code: "auth-required",
      message: "Authentication required",
    });
  }
  return { type: "none", userId: null };
};

const auth = {
  authenticate: authenticate,
};

module.exports = auth;
