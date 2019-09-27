const axios = require("axios");
module.exports = async function LoadConfigFromUrl(e, url) {
  const request = await axios.get(url);
  if (!request.data) {
    return false;
  } else {
    if (!request.data.config) {
      return false;
    }

    if (
      !request.data.config.requests ||
      !request.data.config.name ||
      !request.data.config.author
    ) {
      ShowMessage("Invalid config.", "warning");
      return false;
    }

    Config.Main = request.data.config;

    $("#configFileDragAndDrop").slideUp(600);
    $(".configDetails").fadeIn(1000);
    $(".configDetailsMain").append(
      '<label class="subtitle">Config loaded!</label><br>'
    );
    $(".configDetailsMain").append(`<b>Config:</b> ${Config.Main.name}<br>`);
    $(".configDetailsMain").append(`<b>Author:</b> ${Config.Main.author}`);

    Config.loaded = true;

    console.log(`Config loaded from ${url}`);
  }
};
