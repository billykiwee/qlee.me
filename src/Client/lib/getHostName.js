export function getHostName(url) {

    if (url) {
        const getUrl = new URL(url)
        const hostname = getUrl.hostname

        const isWWW = hostname.split('.')[0] === 'www' ? true : false


        if (isWWW) return hostname.split('.')[1]
        else return hostname.split('.')[0]
    }
}
