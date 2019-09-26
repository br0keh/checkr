const Requests = require("../Requests")
const requests = new Requests()
const axios = require('axios')

class Robot{
  async start(Config, Params){

    return requests.RequestMaker(Config, Params)

  }
}

module.exports = Robot