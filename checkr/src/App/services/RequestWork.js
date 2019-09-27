const CheckKeywords = require("./CheckKeywords");

module.exports = async function RequestWork(Config, Params, requests) {
  let Request = await requests.execute(Config, Params);

  CheckKeywords(Config, Request, Params);
};
