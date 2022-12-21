
export function checkURLReference(url) {

    if (url.includes('qlee.me') || url.includes('localhost:')) return false
    else if (url === null) return false
    else return true
}