const express = require('express');

const sessionController = require('../controllers/session.controller');
const router = express.Router();

//const Session = require('../../models/Session')

router.get('/test', (req, res) => res.json({ msg: 'session router words' }));

router.post('/start', sessionController.startSession, (req, res) => {
  return res.status(200).json(res.locals.session);
});

router.put('/add', sessionController.addBird, (req, res) => {
  return res.status(200).json(res.locals.session);
});

router.put('/delete', sessionController.deleteBird, (req, res) => {
  return res.status(200).json(res.locals.session);
});


module.exports = router;
