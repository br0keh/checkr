var $ = require("jQuery");
const easyjson = require("easyjson");

const configDropContainer = document.getElementById("configFileDragAndDrop");
const comboListDropContainer = document.getElementById("comboListDragAndDrop");
const proxyListDragAndDrop = document.getElementById("proxyListDragAndDrop");

//MODULES
const Requests = require("./src/App/services/Requests.js");
const LoadProxyList = require("./src/App/services/LoadProxyList.js");
const LoadConfig = require("./src/App/services/LoadConfig.js");
const LoadCombo = require("./src/App/services/LoadCombo.js");
const LoadConfigFromUrl = require("./src/App/services/LoadConfigFromUrl.js");
const RequestWork = require("./src/App/services/RequestWork.js");

//STATES
const Checker = {
  running: false
};

const Proxies = {
  list: [],
  loaded: false
};

const Config = {
  Main: {},
  loaded: false
};

const Combo = {
  list: [],
  loaded: false
};

const Workers = [];

function ShowMessage(MessageText, MessageType) {
  $(".messages").append(
    "<div id='appMessage' style='display:none' class='alert alert-" +
      MessageType +
      "'>" +
      MessageText +
      "</div>"
  );

  $("#appMessage").slideDown(500);

  setTimeout(() => {
    $("#appMessage").slideUp(500, () => {
      $(".messages").html("");
    });
  }, 3000);
}

window.onload = async function() {
  $("#stopBtn").click(() => {
    Workers.forEach(
      Worker => {
        Worker.terminate();
      },
      () => {
        Checker.running = false;
      }
    );
  });
  $("#startBtn").click(async () => {
    if (Config.loaded === false)
      return ShowMessage("Please load config before you start.", "danger");
    if (Combo.loaded === false)
      return ShowMessage("Please load combolist before you start.", "danger");

    console.log("[action] checker started");

    Checker.running = true;

    $(".hits").fadeIn(1000, () => {
      $(".fails").fadeIn(1000);
    });

    const requests = new Requests();

    Combo.list.forEach(async (Credentials = String) => {
      let formatedCredentials = String(Credentials)
        .replace(":", "|")
        .replace(";", "|")
        .split("|");
      let Params = {
        email: formatedCredentials[0],
        password: formatedCredentials[1]
      };

      Workers.push(
        new Worker(await RequestWork(Config.Main, Params, requests))
      );
    });
  });

  $("#ResetComboBtn").click(() => {
    if (Checker.running === true)
      return ShowMessage("Stop checker before reset combo list", "danger");

    Combo.list = [];
    Combo.loaded = false;
    $(".combolist-text-loaded").slideUp(500, () => {
      $("#comboListCountText").html("");
      $(".combolist-text").slideDown(1000);
    });
  });

  $("#proxyTypeSelect").click(e => {
    e.preventDefault();
    e.stopPropagation();

    return ShowMessage(
      "SOCKS5 and SOCKS4 support is not available yet.",
      "warning"
    );
  });

  $("#ResetProxiesBtn").click(() => {
    if (Checker.running === true)
      return ShowMessage("Stop checker before reset proxies", "danger");

    Proxies.list = [];
    Proxies.loaded = false;
    $(".proxylist-text-loaded").slideUp(500, () => {
      $("#proxylistCountText").html("");
      $(".proxylist-text").slideDown(1000);
    });
  });

  $("#ResetConfigBtn").click(() => {
    $(".configDetails").slideUp(600, () => {
      $("#configFileDragAndDrop").slideDown(200);
    });
    $(".configDetailsMain").html(" ");

    Config.Main = {};
    Config.loaded = false;

    console.log("[action] reset config");
  });

  function isValidURL(str) {
    var a = document.createElement("a");
    a.href = str;
    return a.host && a.host != window.location.host;
  }

  $("#LoadConfig").click(async function(e) {
    console.log("[action] load config");

    let ConfigUrl = $("#configUrl").val();

    if (!isValidURL(ConfigUrl))
      return ShowMessage("URL invalid or request error.", "danger");

    if (Object.keys(Config.Main).length > 1) {
      return ShowMessage("Reset config!", "danger");
    }

    if ((await LoadConfigFromUrl(e, ConfigUrl)) === false) {
      return ShowMessage("Invalid config or url!", "danger");
    }

    $("#configUrl").val("");
  });

  proxyListDragAndDrop.ondragover = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  proxyListDragAndDrop.ondrop = async e => {
    e.preventDefault();
    e.stopPropagation();

    await LoadProxyList(e);
  };
  proxyListDragAndDrop.ondragend = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  configDropContainer.ondragover = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  configDropContainer.ondrop = function(e) {
    e.preventDefault();
    e.stopPropagation();

    LoadConfig(e);
  };

  configDropContainer.ondragend = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  comboListDropContainer.ondragover = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  comboListDropContainer.ondrop = async e => {
    await LoadCombo(e);
  };

  comboListDropContainer.ondragend = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };
};
