const Session = require('../models/Session');
const sessionController = {};


sessionController.startSession = (req, res, next) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  Session.create({lat, lng}, (err, data) => {
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
