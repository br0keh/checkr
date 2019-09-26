module.exports = async function RequestWork(Config, Params, requests){


  let Request = await requests.execute(Config, Params)

      
  if(Request.keywords.success){
    //LOGIN SUCCESS
    $("#hitsTable").append(`
    <tr>
      <th scope='row'>BOT-${getRandomInt(0,9)}</th>
      <td>${Params.email}</td>
      <td>${Params.password}</td>
      <td>SUCCESS KEYWORD: ${Request.keywords.success}</td>
    </tr>
    `)

  }else if(Request.keywords.fail){
    //LOGIN FAIL
    $("#failsTable").append(`
    <tr>
      <th scope='row'>BOT-${getRandomInt(0,9)}</th>
      <td>${Params.email}</td>
      <td>${Params.password}</td>
      <td>FAIL KEYWORD: ${Request.keywords.fail}</td>
    </tr>
    `)

  }else{
    //UNKNOW ERROR
    $("#failsTable").append(`
    <tr>
      <th scope='row'>BOT-${getRandomInt(0,9)}</th>
      <td>${Params.email}</td>
      <td>${Params.password}</td>
      <td>UNKNOW ERROR</td>
    </tr>
    `)
  }
}