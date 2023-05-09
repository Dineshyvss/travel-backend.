const db = require("../models");
const { authenticate } = require("../authentication/authentication");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt } = require("../authentication/crypto");

exports.login = async (req, res) => {
  let { userId } = await authenticate(req, "credentials");

  let user = {};
  await User.findByPk(userId).then((data) => {
    user = data;
  });

  let expireTime = new Date(Date.now() + 1);

  const session = {
    email: user.email,
    userId: userId,
    expirationDate: expireTime,
  };
  await Session.create(session).then(async (data) => {
    let sessionId = data.id;
    let token = await encrypt(sessionId);
    let userInfo = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      token: token,
    };
    res.send(userInfo);
  });
};

exports.logout = async (req, res) => {
  let { sessionId } = await authenticate(req, false);
  if (sessionId == null) return;
  await Session.delete({ where: { id: sessionId } }).catch((error) => {
    console.log(error);
  });
};
