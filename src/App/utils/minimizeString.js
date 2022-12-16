export function minimizeString(string, lenght) {

    if (string) {
        if (string.length < lenght) return string
        else return string.split('').splice(0,lenght).toString().split(',').join('') + '...'
    }
}