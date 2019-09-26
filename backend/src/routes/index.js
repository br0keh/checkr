const routes = require('express').Router();
const Robot = require('../controllers/Robot')
const RobotController = new Robot()


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
})


module.exports = routes
