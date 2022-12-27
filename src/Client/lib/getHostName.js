export function getHostName(url) {

    if (url) {

        try {
            const getUrl = new URL(url)
    
            const hostname = getUrl.hostname
    
            const isWWW = hostname.split('.')[0] === 'www' ? true : false
            const isM = hostname.split('.')[0] === 'm' ? true : false

    
            if (isWWW || isM) return hostname.split('.')[1]
            else return hostname.split('.')[0]
        }
        catch {
            return 
        }

    }
}
