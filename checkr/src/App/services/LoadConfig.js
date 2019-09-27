module.exports = function LoadConfig(e) {
    if (!e.dataTransfer.files[0].name.endsWith(".json")) {
        return ShowMessage("JSON files only.", "warning");
    }

    let ConfigPath = e.dataTransfer.files[0].path;

    if (
        !easyjson.path(ConfigPath).get("config").requests ||
        !easyjson.path(ConfigPath).get("config").name ||
        !easyjson.path(ConfigPath).get("config").author
    ) {
        return ShowMessage("Invalid config.", "warning");
    }

    Config.Main = easyjson.path(ConfigPath).get("config");

    $("#configFileDragAndDrop").slideUp(600);
    $(".configDetails").fadeIn(1000);
    $(".configDetailsMain").append(
        '<label class="subtitle">Config loaded!</label><br>'
    );
    $(".configDetailsMain").append(`<b>Config:</b> ${Config.Main.name}<br>`);
    $(".configDetailsMain").append(`<b>Author:</b> ${Config.Main.author}`);

    Config.loaded = true;

    console.log(`Config loaded from ${ConfigPath}`);
};
