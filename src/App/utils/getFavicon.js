export default function getFavicon(link) {

    if (link.icon) return link.icon
    else return `http://www.google.com/s2/favicons?domain=${link.url}&sz=${256}`
}
