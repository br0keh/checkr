const Requests = require("../Requests")
const requests = new Requests()
const axios = require('axios')

class Robot{
<<<<<<< HEAD
  async start(Config, Params){

    return requests.RequestMaker(Config, Params)

=======
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
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
  }
}

module.exports = Robot