const { exec } = require("child_process");
const express = require("express");

const app = express();

const pushEveryXMinutes = 10;

function gitPush() {
  const date =
    new Date().toDateString() + " " + new Date().toLocaleTimeString();
  exec(`git add . && git commit -m "${date}" && git push`, () => {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `Les modifications ont été poussées à ${date}`
    );
  });
}

app.listen(8080, () => {
  gitPush();
  setInterval(gitPush, pushEveryXMinutes * 1000 * 60);
  console.log("push running");
});
