
export function checkURLReference(url) {

    
    if (url) {
            if (url.includes('qlee.me' || 'localhost:')) return null
            else return url
    }
    else return null
}