const { exec } = require("child_process");
const express = require("express");

const app = express();

const pushEveryXMinutes = 10;

const args = process.argv.slice(2);
const name = args.map((a) => a !== "-m");

console.log(name);

function gitPush() {
  const date =
    new Date().toDateString() + " " + new Date().toLocaleTimeString();

  exec(
    `git add . && git commit -m "${name}" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(name);
        return;
      }
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Les modifications ont été poussées à ${name}`
      );
    }
  );
}

app.listen(8080, () => {
  gitPush();
  setInterval(gitPush, pushEveryXMinutes * 1000 * 60);
  console.log("push running");
});
