module.exports = function CheckKeywords(Config, Request, Params) {
    const Keywords = Config.requests[0].keywords;

    for (let reqIndex = 0; reqIndex < Config.requests.length; reqIndex++) {
        const Data = Config.requests[reqIndex].json_response
            ? JSON.stringify(Request.list[reqIndex].data)
            : Request.list[reqIndex].data;
        for (let failIndex = 0; failIndex < Keywords.fail.length; failIndex++) {
            if (String(Data).indexOf(Keywords.fail[failIndex]) > -1) {
                return $("#failsTable").append(`
        <tr>
          <th scope='row'></th>
          <td>${Params.email}</td>
          <td>${Params.password}</td>
          <td>FAIL KEYWORD: '<code>${Keywords.fail[failIndex]}</code>'</td>
        </tr>
        `);
            }
        }

        for (
            let succIndex = 0;
            succIndex < Keywords.success.length;
            succIndex++
        ) {
            if (String(Data).indexOf(Keywords.success[succIndex]) > -1) {
                return $("#hitsTable").append(`
        <tr>
          <th scope='row'></th>
          <td>${Params.email}</td>
          <td>${Params.password}</td>
          <td>SUCCESS KEYWORD: '<code>${Keywords.success[succIndex]}</code>'</td>
        </tr>
        `);
            }
        }
    }

    return $("#failsTable").append(`
      <tr>
        <th scope='row'></th>
        <td>${Params.email}</td>
        <td>${Params.password}</td>
        <td>UNKNOW ERROR</td>
      </tr>
  `);
};
