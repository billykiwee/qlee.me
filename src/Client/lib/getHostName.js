export function getHostName(url) {
  if (url) {
    try {
      const getUrl = new URL(url);
      const hostname = getUrl.hostname;
      const filterHostname =
        hostname.split(".").length === 3
          ? hostname.split(".")[1]
          : hostname.split(".")[0];
      return filterHostname;
    } catch {
      return;
    }
  }
}
