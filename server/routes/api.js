const express = require('express')

const eBirdController = require('../controllers/eBird.controller');
const router = express.Router()

//const User = require('../../models/User')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

router.get('/hotspots', eBirdController.getHotspots, (req, res) => {
  res.status(200).json(res.locals.hotspots);
  });

router.get('/notables', eBirdController.getNotables, (req, res) => {
  res.status(200).json(res.locals.notables);
  });

module.exports = router