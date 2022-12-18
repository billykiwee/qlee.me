export default function UniqueID(name, lenght) {

    var UID = ''
    var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  
    for (var i = 0; i < lenght; i++)
      UID += char.charAt(Math.floor(Math.random() * char.length))
  
    return name ? name + '-' + UID : UID
}

