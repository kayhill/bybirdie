const User = require('../models/User');

const userController = {};


userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });

  newUser.save(function (err, user) {
    if (err) {
      res.locals.err = true;
      return next()
    }
    else {
      res.locals.user = user;
      return next();
    }
  });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }, function (err, user) {
    if (err) {
      return next({
        log: `error occured in userController.verifyUser: ${err}`,
        message:
          'Error in userController.verifyUser. See log for more details.',
      });
    } else {
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return next({
            log: `error occured in userController.verifyUser: ${err}`,
            message:
              'Error in userController.verifyUser. See log for more details.',
          });
        } else {
          res.locals.isMatch = isMatch;
          res.locals.user = user;
          return next();
        }
      });
    }
  });
};

module.exports = userController;
