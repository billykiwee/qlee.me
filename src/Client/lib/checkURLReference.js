
export function checkURLReference(url) {

    if (url) 
        if (url.includes('qlee.me' || 'localhost:') && url !== 'null') return url
}