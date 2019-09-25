const Requests = require("../Requests")
const requests = new Requests()
const axios = require('axios')

class Robot{
  async start(Config){


    return requests.RequestMaker(Config)


    const login = await requests.login(
      "https://httpbin.org/post",
      { 'url': 'SUCCESS' }, 
      {},
      false,
      ["SUCCESS"],
      ['404']
    )


    return login
  }
}

module.exports = Robot