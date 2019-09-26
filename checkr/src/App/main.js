
var $ = require('jQuery');
const easyjson = require('easyjson')

const DragContainer = document.getElementById('configFileDragAndDrop')


const Requests = require("./src/App/services/Requests.js")
const LoadConfig = require("./src/App/services/LoadConfig.js")
const LoadConfigFromUrl = require("./src/App/services/LoadConfigFromUrl.js")

const Config = {
  Main: {},
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

      console.log("Starting...")
      const requests = new Requests()

      let Params = {
        email: "aasdasd@gmail.com",
        password: "sadsadsad"
      }
      
      requests.execute(Config.Main, Params)


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

  DragContainer.ondragover = function (e){
    e.preventDefault()
    e.stopPropagation()
  }

  DragContainer.ondrop= function (e){
    e.preventDefault();
    e.stopPropagation();

    
    LoadConfig(e)

  }
  DragContainer.ondragend = function (e){
    e.preventDefault();
    e.stopPropagation();

  }
  
}