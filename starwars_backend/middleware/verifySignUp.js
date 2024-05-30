const User = require('../models/User');

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  let user = await User.findOne({
    username: req.body.username
  }).exec();

  if (user) {
    return res.status(400).send({ message: "Failed! Username is already in use!" });
  }

  // Email
  user = await User.findOne({
    email: req.body.email
  }).exec();

  if (user) {
    return res.status(400).send({ message: "Failed! Email is already in use!" });
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
