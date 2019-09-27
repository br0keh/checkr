const axios = require("axios");

class Requests {
  async execute(Config, Params) {
    const Requests = {
      list: [],
      tokens: [],
      keywords: {}
    };

    for (
      let ReqIndex = 0;
      ReqIndex < Object.keys(Config.requests).length;
      ReqIndex++
    ) {
      let CurrentRequest = Config.requests[ReqIndex];

      const RequestObject = {
        id: ReqIndex,
        method: CurrentRequest.method,
        user: Params.email,
        pass: Params.password,
        post_validated: true
      };

      if (CurrentRequest.method === "POST") {
        if (!Params.email || !Params.password) {
          RequestObject.error = "please enter email/password";
          RequestObject.post_validated = false;
          return;
        }

        let TokenMatch = CurrentRequest.postfields.match("<TOKEN([0-9]{1,2})>");

        if (TokenMatch) {
          let token = Requests.tokens[TokenMatch[1]]
            ? Requests.tokens[TokenMatch[1]].token
            : Requests.tokens[0].token;
          let ReqData = String(CurrentRequest.postfields)
            .replace("<USER>", Params.email)
            .replace("<PASS>", Params.password)
            .replace(TokenMatch[0], token);
          CurrentRequest.postfields = ReqData;
        } else {
          let ReqData = String(CurrentRequest.postfields)
            .replace("<USER>", Params.email)
            .replace("<PASS>", Params.password);
          CurrentRequest.postfields = ReqData;
        }
      }

      let RequestOptions = {
        method: CurrentRequest.method,
        url: CurrentRequest.url,
        data: CurrentRequest.postfields ? CurrentRequest.postfields : null,
        headers: CurrentRequest.headers ? CurrentRequest.headers : null,
        json: CurrentRequest.json_postfields,
        withCredentials: true
      };

      let Request = await axios(RequestOptions).catch(err => {
        console.error(`Request #${ReqIndex}: failed.`);
      });
      console.log("=> GRAB RESPONSE: " + CurrentRequest.grab);

      if (Boolean(CurrentRequest.grab) === true) {
        RequestObject.data = Request.data;
      }

      //GET TOKENS
      if (CurrentRequest.tokens) {
        for (
          let TokenIndex = 0;
          TokenIndex < CurrentRequest.tokens.length;
          TokenIndex++
        ) {
          let TokenID = CurrentRequest.tokens[TokenIndex].id;
          let TokenRegex = String(
            CurrentRequest.tokens[TokenIndex].token
          ).replace("<TOKEN>", "(.+)");
          let TokenMatch = String(Request.data).match(TokenRegex);

          if (TokenMatch) {
            Requests.tokens.push({ id: TokenID, token: TokenMatch[1] });
          }
        }
      }
      /*
      //VERIFY KEYWORDS
      if(CurrentRequest.keywords){
        Requests.keywords = await this.keywords(
          Request.data,
          CurrentRequest.json_response,
          CurrentRequest.keywords.success,
          CurrentRequest.keywords.fail
        )
      }
      */

      Requests.list.push(RequestObject);
    }

    return Requests;
  }

  async keywords(
    data = String,
    JSONdata = false,
    successMessages = [],
    errorsMessages = []
  ) {
    //keyword object
    const keywords = {};
    //check if is json
    if (JSONdata === true) data = JSON.stringify(data);
    //check success keywords
    for (let i = 0; i < successMessages.length; i++) {
      if (String(data).indexOf(successMessages[i]) > -1) {
        keywords.success = successMessages[i];
      }
    }
    //check fail keywords
    for (let i = 0; i < errorsMessages.length; i++) {
      if (String(data).indexOf(errorsMessages[i]) > -1) {
        keywords.fail = errorsMessages[i];
      }
    }

    return keywords;
  }
}

module.exports = Requests;
