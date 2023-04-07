const { v4: uuidv4 } = require("uuid");

async function getStatistics(req, link, endLoading) {
  const adress = await getAdress();

  const refferer = req.get("Referer")
    ? new URL(req.get("Referer")).hostname
    : "";

  const userAgent = req.headers["user-agent"];

  const device =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
      ? "Mobile"
      : "Desktop";

  const stats = {
    adress,
    date: new Date(),
    device,
    id: uuidv4(),
    linkID: link.id,
    refferer,
    speed: (endLoading / 1000).toFixed(2),
    views: link.views,
  };

  return stats;
}
module.exports = { getStatistics };

async function getAdress() {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .then(async (ip) => {
      return fetch(`https://ipapi.co/${ip}/json/`)
        .then((response) => response.json())
        .then((adress) => {
          return {
            country: adress.country_name,
            city: adress.city,
            country_code: adress.country_code,
          };
        });
    });
}
