const fs = require("fs");
module.exports = async function LoadProxyList(e) {
  if (!e.dataTransfer.files[0].name.endsWith(".txt")) {
    return ShowMessage("TXT files only.", "warning");
  }

  fs.readFile(e.dataTransfer.files[0].path, "utf8", (err, data) => {
    if (err) return console.log(err);

    let List = data.split("\n");

    const ListFiltered = List.filter(Boolean);

    Proxies.list = ListFiltered;
    Proxies.loaded = true;
    $(".proxylist-text").slideUp(500, () => {
      $("#proxylistCountText").html(
        Object.keys(Proxies.list).length + " proxies"
      );
      $(".proxylist-text-loaded").slideDown(1000);
    });
  });
};
