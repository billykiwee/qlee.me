export function GitPush() {
  function runCommand() {
    let msg = `
        git add .
        git commit -m 'edit ${window.location.pathname}'
        git push
    `

    navigator.clipboard.writeText(msg)

  }

  const bouton = document.createElement("button");
  // Ajout d'un texte au bouton
  bouton.innerHTML = "GIT";
  // Ajout d'un événement de clic au bouton
  bouton.addEventListener("click", runCommand);
  // Ajout du bouton à l'interface utilisateur
  document.body.appendChild(bouton)


  bouton.style= `
    background: var(--blue);
    width: 3rem;
    position: fixed;
    margin: 1rem;
    z-index:99;
    top: 2rem;
    color: white;
  `
}