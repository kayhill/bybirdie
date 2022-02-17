const Session = require('../models/Session');
const sessionController = {};


sessionController.getHistory = (req, res, next) => {
  const user_id=req.query.id;

  Session.findAll({user_id}, function (err, sessions) {
    if (err) {
      return next({log: `ERROR in session.controller.getSession: ${err}`,
      message: `An error occured in sessionController.getSession. See log for more info`,
      })
    } else {
      if (sessions.length === 0) {
        res.locals.empty = true;
        res.locals.message="You haven't saved any sessions yet."
      } else {
        res.locals.sessions = sessions;
      }
      return next()
    }
  })
}

sessionController.startSession = (req, res, next) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const user_id = req.body.user_id;

  Session.create({lat, lng, user_id}, (err, data) => {
    if (err) {
      return next({log: `ERROR in session.controller.startSession: ${err}`,
      message: `An error occured in sessionController.startSession. See log for more info`,
      })
    } else {
      res.locals.session = data;
      return next()
    }
  });
}

sessionController.addBird = (req, res, next) => {
  const sessionId = req.body.sessionId;
  const bird = req.body.bird;
  //bird = bird.charAt(0).toUpperCase() + bird.toLowerCase().slice(1);
  Session.findOneAndUpdate({_id: sessionId}, { $push:{ birds: [bird]}}, {new: true}, (err, data) => {
    if (err) {
      return next({log: `ERROR in session.controller.addBird: ${err}`,
      message: `An error occured in sessionController.addBird. See log for more info`,
      })
    } else {
      res.locals.session = data;
      return next()
    }
  });
}

sessionController.deleteBird = (req, res, next) => {
  const sessionId = req.body.sessionId;
  
  Session.findOneAndUpdate({_id: sessionId}, { $pop:{ birds: 1}}, {new: true}, (err, data) => {
    if (err) {
      return next({log: `ERROR in session.controller.addBird: ${err}`,
      message: `An error occured in sessionController.addBird. See log for more info`,
      })
    } else {
      res.locals.session = data;
      return next()
    }
  });
}

module.exports = sessionController;
