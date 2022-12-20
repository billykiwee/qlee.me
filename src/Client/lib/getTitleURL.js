
export function getTitleURL(url) {

    let siteWithoutRegex = url.split('.')[1]

    const regex = /^\w+$/

    const domain = url.replace(/.*?:\/\//g, "")
    const domainParts = domain.split("/")
    const siteWithRegex = domainParts[0]


    if (regex.test(domainParts[0])) return siteWithRegex 
    else return siteWithoutRegex
}