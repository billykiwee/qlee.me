export function checkShortLinkAvailable(input, UserLinks) {
  const divAlert = document.querySelector("#alert-shortlink");

  if (input.length) {
    let isIDExist = UserLinks.filter((link) => link.id === input)[0];

    if (!isIDExist) {
      divAlert.style.color = "var(--green)";
      divAlert.innerHTML = `Le lien court "${input}" est disponible`;

      return true;
    } else {
      divAlert.style.color = "var(--red)";
      divAlert.innerHTML = `Le lien court "${input}" n'est pas disponible`;

      return false;
    }
  } else return (divAlert.innerHTML = "");
}
