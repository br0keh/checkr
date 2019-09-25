const axios = require('axios')

class Requests{
  

  async RequestMaker(Config){

    const APIResponse = {
      success: Boolean,
      message: String, 
    }

    // Load config from json file, and execute requests and functions

    const Requests = []

    for (let RequestIndex = 0; RequestIndex < Config.config.requests.length; RequestIndex++) {
      
        let CurrentRequest = Config.config.requests[RequestIndex]

        let CurrentRequestOptions = {
          method: CurrentRequest.method === "TOKEN" ? "GET" : "POST",
          url: CurrentRequest.url,
          data: CurrentRequest.postfields ? CurrentRequest.postfields : null,
          headers: CurrentRequest.headers ? CurrentRequest.headers : null,
          json: CurrentRequest.jsonData
        };

        const HTTPRequest = await axios(CurrentRequestOptions)

        Requests.push({id: RequestIndex, type:CurrentRequest.method, response: HTTPRequest.data,})

        Requests.map((request) => {
          if(request.type == "TOKEN"){
            const TokenRegex = String(CurrentRequest.token).replace('<TOKEN>', '(.+)')
            if(!String(request.response).match(TokenRegex)[1]){
              APIResponse.success = false 
              APIResponse.message = "Erro, token não capturado."
            } else {
              APIResponse.success = true 
              APIResponse.message = ""
            }
          }
        })
        return JSON.stringify(APIResponse)

        if(CurrentRequest.isFinalRequest === true) {
          return requests.keywords(
            ExecRequest.data,
            CurrentRequest.keywords.success,
            CurrentRequest.keywords.fail
            )
        }

            
    }

    return console.log(RequestResponses)

  }

  scrapeToken(data, start, end){
    let f, c
    f = String(data).split(start)[1]
    c = String(f).split(end)[0]
    return c
  }
  
  async token(url, headers, BeforeToken, AfterToken){
    const TokenRequest = await axios.get(url, )
    return this.scrapeToken(
      TokenRequest.data,
      BeforeToken,
      AfterToken
    )
  }

  async keywords(data = String, JSONdata = false, successMessages = [], errorsMessages = []){
    
    const keywords = {
      keywords: {}
    }

    if(JSONdata === true) data = JSON.stringify(data)

    successMessages.map((Message) => {
      if(String(data).indexOf(Message) > -1){
        keywords.keywords = { success: Message }
      }
    })

    errorsMessages.map((Message) => {
      
      if(String(data).indexOf(Message) > -1){
        keywords.keywords = { fail: Message }
      }
    })

    return keywords
  
  }

  async login(url, postfields, headers, json = Boolean, successKeywords = [], failKeywords = [] ){

    

    const authOptions = {
      method: 'POST',
      url: url,
      data: postfields,
      headers: headers,
      json: json
    };


    const LoginRequest = await axios(authOptions)

    const keywords = await this.keywords(LoginRequest.data, true, successKeywords, failKeywords)
  
    const LoginResponse = {
      status: LoginRequest.status,
      success: keywords.keywords.success ? true : false,
    }
    
    return JSON.stringify(LoginResponse)

  }
}
module.exports = Requests