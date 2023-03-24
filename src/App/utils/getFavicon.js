export default function getFavicon(link) {
  if (link.icon) {
    return link.icon;
  }
  if (link.url)
    return `http://www.google.com/s2/favicons?domain=${link?.url}&sz=${256}`;
  else return `http://www.google.com/s2/favicons?domain=${link}&sz=${256}`;
}
