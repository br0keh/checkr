const axios = require('axios')

class Requests{
  

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
            CurrentRequest.keywords.success,
            CurrentRequest.keywords.fail
            )
        }


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
      keyword: {}
    }

    if(JSONdata === true) data = JSON.stringify(data)

    successMessages.map((Message) => {
      if(String(data).indexOf(Message) > -1){
        keywords.keyword = { success: Message }
      }
    })

    errorsMessages.map((Message) => {
      
      if(String(data).indexOf(Message) > -1){
        keywords.keyword = { fail: Message }
      }
    })

    return keywords
  
  }

  
}
module.exports = Requests