const fs = require('fs')
module.exports = async function LoadCombo(e){
  if(!e.dataTransfer.files[0].name.endsWith(".txt")){
    return ShowMessage("TXT files only.", 'warning')
  }

  fs.readFile(e.dataTransfer.files[0].path, "utf8", (err, data)=>{
    if(err) return console.log(err)

    let List = data.split('\n')

    const ListFiltered = List.filter(Boolean)

    Combo.list = ListFiltered
    Combo.loaded = true
    $(".combolist-text").slideUp(500, () => {
      $("#comboListCountText").html(Object.keys(Combo.list).length + " email/passwords")
      $(".combolist-text-loaded").slideDown(1000)
    })

  }) 

}