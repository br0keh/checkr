
var $ = require('jQuery');
const easyjson = require('easyjson')

const configDropContainer = document.getElementById('configFileDragAndDrop')
const comboListDropContainer = document.getElementById('comboListDragAndDrop')
//comboListDragAndDrop

const Requests = require("./src/App/services/Requests.js")
const LoadConfig = require("./src/App/services/LoadConfig.js")
const LoadCombo = require("./src/App/services/LoadCombo.js")
const LoadConfigFromUrl = require("./src/App/services/LoadConfigFromUrl.js")

const Checker = {
  running: false,
}

const Config = {
  Main: {},
  loaded: false,
}

const Combo = {
  list: [],
  loaded: false,
}


function ShowMessage(MessageText, MessageType){
  $(".messages").append("<div id='appMessage' style='display:none' class='alert alert-" + MessageType + "'>" + MessageText + "</div>")

  $("#appMessage").slideDown(500)

  setTimeout(() => {
    $("#appMessage").slideUp(500, () => {
      $(".messages").html("")
    })
  }, 3000)

}

window.onload = function(){

  $("#startBtn").click(() => {

      if(Config.loaded === false) return ShowMessage("Please load config before you start.", "danger")
      if(Combo.loaded === false) return ShowMessage("Please load combolist before you start.", "danger")

      $(".results").fadeIn(500)

      console.log("Starting...")
      const requests = new Requests()

      Combo.list.forEach((value) => {
        console.log(value)
       // requests.execute(Config.Main, Params)
      })



  })

  $("#ResetComboBtn").click(()=>{
    
    if(Checker.running === true) return ShowMessage("Stop checker before reset combo", "danger")

    Combo.list = []
    Combo.loaded = false
    $(".combolist-text-loaded").slideUp(500, () => {
      $("#comboListCountText").html("")
      $(".combolist-text").slideDown(1000)
    })

  })
  $("#ResetConfigBtn").click(() => {
      $(".configDetails").slideUp(600, () => {
        $("#configFileDragAndDrop").slideDown(200)
      })
      $(".configDetailsMain").html(' ')
      
      Config.Main = {}
      Config.loaded = false
      
      console.log('Config resetada.')
  
  })

  function isValidURL(str) {
    var a  = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);
  }

  $("#LoadConfig").click(async function (e){

    console.log("sadasd")
    let ConfigUrl = $("#configUrl").val()

    if(!isValidURL(ConfigUrl)) return ShowMessage("URL invalid or request error.", "danger")

    if(Object.keys(Config.Main).length > 1){
      return ShowMessage("Reset config!", "danger")
    }

    const Load = await LoadConfigFromUrl(e, ConfigUrl)
    if(Load === false){
      return ShowMessage("Fail!", "danger")
    }


  })

  configDropContainer.ondragover = function (e){
    e.preventDefault()
    e.stopPropagation()
  }

  configDropContainer.ondrop= function (e){
    e.preventDefault();
    e.stopPropagation();

    LoadConfig(e)

  }
  configDropContainer.ondragend = function (e){
    e.preventDefault();
    e.stopPropagation();
  }



  comboListDropContainer.ondragover = function (e){
    e.preventDefault()
    e.stopPropagation()
  }

  comboListDropContainer.ondrop = async (e) => {
    await LoadCombo(e)
  }

  comboListDropContainer.ondragend = function (e){
    e.preventDefault();
    e.stopPropagation();
  }
  
}