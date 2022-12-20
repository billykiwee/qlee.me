export function GitPush() {
  function runCommand() {
    let msg = `
        git add .
        git commit -m 'edit ${window.location.pathname}'
        git push
    `
    navigator.clipboard.writeText(msg)
  }

  window.onclick = e => runCommand()
}
