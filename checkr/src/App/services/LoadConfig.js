module.exports = function LoadConfig(e){
  if(!e.dataTransfer.files[0].name.endsWith(".json")){
    return ShowMessage("JSON files only.", 'warning')
  }

  let ConfigPath = e.dataTransfer.files[0].path
  
  Config.Main = easyjson.path(ConfigPath).get('config')

  $("#configFileDragAndDrop").slideUp(600)
  $(".configDetails").fadeIn(1000)
  $(".configDetailsMain").append('<h4>Config loaded!</h4>')
  $(".configDetailsMain").append(`<b>Config:</b> ${Config.Main.name}<br>`)
  $(".configDetailsMain").append(`<b>Author:</b> ${Config.Main.author}`)

  Config.loaded = true

  console.log(`Config loaded from ${ConfigPath}`)
}