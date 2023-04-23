export async function getAdress() {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .then(async (ip) => {
      return fetch(`https://ipapi.co/${ip}/json/`)
        .then((response) => response.json())
        .then((adress) => {
          return adress;
        });
    });
}
