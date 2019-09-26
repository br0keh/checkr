const axios = require("axios")
module.exports = async function LoadConfigFromUrl(e, url){
  const request = await axios.get(url)
  if(!request.data){
    return false
  }else{
      if(!request.data.config)
      { return false }

      Config.Main = request.data.config
    
      $("#configFileDragAndDrop").slideUp(600)
      $(".configDetails").fadeIn(1000)
      $(".configDetailsMain").append('<h4>Config loaded!</h4>')
      $(".configDetailsMain").append(`<b>Config:</b> ${Config.Main.name}<br>`)
      $(".configDetailsMain").append(`<b>Author:</b> ${Config.Main.author}`)
    
      Config.loaded = true
    
      console.log(`Config loaded from ${url}`)
    }
  
}