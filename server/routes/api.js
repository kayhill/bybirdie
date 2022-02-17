const express = require('express');

const eBirdController = require('../controllers/eBird.controller');
const userController = require('../controllers/user.controller');
const router = express.Router();

//router.get('/test', (req, res) => res.json({msg: 'backend works'}))

router.get('/hotspots', eBirdController.getHotspots, (req, res) => {
  res.status(200).json(res.locals.hotspots);
});

router.get('/notables', eBirdController.getNotables, (req, res) => {
  res.status(200).json(res.locals.notables);
});

router.post('/login', userController.verifyUser, (req, res) => {
  if (res.locals.isMatch) {
    res.status(200).json(res.locals.user);
  } else if (!res.locals.isMatch) {
    res.status(401).send();
  }
});

router.post('/register', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});


module.exports = router;
