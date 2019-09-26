const axios = require('axios')

class Requests{
  

<<<<<<< HEAD
  async RequestMaker(Config, Params){

    const RequestResponse = {
      success: Boolean,
      message: String, 
      requests: [],
    }

    

    // Load config from json file, and execute requests and functions
   

     // Maker multiple request
    for (let RequestIndex = 0; RequestIndex < Object.keys(Config.config.requests).length; RequestIndex++) {
      

        const CurrentRequest = Config.config.requests[RequestIndex]

        const CurrentRequestOptions = {
          method: CurrentRequest.method,
          url: CurrentRequest.url,
          data: CurrentRequest.postfields ? CurrentRequest.postfields : null,
          headers: CurrentRequest.headers ? CurrentRequest.headers : null,
          json: CurrentRequest.json_postfields,
          withCredentials: true
        };

        console.log(`Config requets: ${Array(Config.config.requests).length}`)
        console.log(`Config Tokens: ${Array(CurrentRequest.tokens).length}`)
        
        const RequestObject = {obj: {
          id:Number,
          method:String,
          url: String,
          tokens: []
        }}

        // prepare data
        if(CurrentRequest.method === "POST"){
          if(!Params.email || !Params.password){
            RequestResponse.success = false,
            RequestResponse.message = "email and pass are required"
            return JSON.stringify(RequestResponse)
          }
          let ReqData = String(CurrentRequest.postfields)
          ReqData.replace('<USER>', Params.email)
          ReqData.replace('<PASS>', Params.password)
          CurrentRequestOptions.data = ReqData
        }

        const HTTPRequest = await axios(CurrentRequestOptions).catch((err)=>{

          RequestResponse.success = false,
          RequestResponse.message = `#${RequestIndex} request failed`

        })
        
        const TokenList = [];

        if(CurrentRequest.tokens){

          for (let TokenIndex = 0; TokenIndex < CurrentRequest.tokens.length; TokenIndex++) {
                  
            const TokenRegex = String(CurrentRequest.tokens[TokenIndex]).replace('<TOKEN>', '(.+)')
            const TokenMatch =  String(HTTPRequest.data).match(TokenRegex)
                  
            if(!TokenMatch){
              RequestResponse.success = false,
              RequestResponse.message = "failed to attempt token on request #"+RequestIndex
            } else {
              RequestResponse.success = true,
              TokenList.push(String(HTTPRequest.data).match(TokenRegex)[1])
            }
        
          }   
            
        }

        const Keywords = {
          words: []
        }
        if(CurrentRequest.isFinalRequest === true ) {
          Keywords.words = await this.keywords(
            HTTPRequest.data,
            CurrentRequest.json_response,
=======
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
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
            CurrentRequest.keywords.success,
            CurrentRequest.keywords.fail
            )
        }

<<<<<<< HEAD

        RequestObject.obj = {
          id:RequestIndex,
          method: CurrentRequest.method,
          url: CurrentRequest.url,
          tokens: TokenList,
          keywords: Keywords.words
        }

        RequestResponse.requests.push(RequestObject.obj)
        
        
            
    }

    return JSON.stringify(RequestResponse)

=======
            
    }

    return console.log(RequestResponses)
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093

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
<<<<<<< HEAD
      keyword: {}
=======
      keywords: {}
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
    }

    if(JSONdata === true) data = JSON.stringify(data)

    successMessages.map((Message) => {
      if(String(data).indexOf(Message) > -1){
<<<<<<< HEAD
        keywords.keyword = { success: Message }
=======
        keywords.keywords = { success: Message }
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
      }
    })

    errorsMessages.map((Message) => {
      
      if(String(data).indexOf(Message) > -1){
<<<<<<< HEAD
        keywords.keyword = { fail: Message }
=======
        keywords.keywords = { fail: Message }
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
      }
    })

    return keywords
  
  }

<<<<<<< HEAD
  
=======
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
>>>>>>> 300c42c51c863a358a260d9c54fe5234305e2093
}
module.exports = Requests