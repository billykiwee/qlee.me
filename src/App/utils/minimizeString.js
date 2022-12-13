export function minimizeString(string, lenght) {
    return string.split('').splice(0,lenght).toString().split(',').join('') + '...'
}