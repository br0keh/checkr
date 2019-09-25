const routes = require('express').Router();
const Robot = require('../controllers/Robot')
const RobotController = new Robot()
const axios = require('axios')

const Config = require("../../config.example.json")

routes.get('/api', async (req, res) => {
  await res.send(await RobotController.start(Config))
})


module.exports = routes
