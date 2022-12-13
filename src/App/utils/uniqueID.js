export default function UniqueID(lenght) {

    var UID = ''
    var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      UID += char.charAt(Math.floor(Math.random() * char.length))
  
    return UID
}



export function incrementalID() {
    return new Date().valueOf()
}