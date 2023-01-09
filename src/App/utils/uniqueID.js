export default function UniqueID(name, lenght) {

    var UID = ''
    var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  
    for (var i = 0; i < lenght ?? 5; i++) {
      UID += char.charAt(Math.floor(Math.random() * char.length))
    }
  

    if (!name && !lenght) return UID

    return name ? name + '-' + UID : UID
}

