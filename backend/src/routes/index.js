const routes = require('express').Router();
const Robot = require('../controllers/Robot')
const RobotController = new Robot()
<<<<<<< HEAD


const Config = require("../../configs/config.cpanelstore.json")

/*  load config by url
const LoadConfig = async (url) => {
  const request = await axios.get(url)
  return request.data
}
*/

routes.get('/api', async (req, res) => {
  console.log(Config)
  await res.send(await RobotController.start(Config, req.query))
=======
const axios = require('axios')

const Config = require("../../config.example.json")

routes.get('/api', async (req, res) => {
  await res.send(await RobotController.start(Config))
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
})


module.exports = routes
