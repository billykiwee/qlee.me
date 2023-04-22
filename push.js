const { exec } = require("child_process");
const express = require("express");

const app = express();

const pushEveryXMinutes = 1;

function gitPush() {
  const date =
    new Date().toDateString() + " " + new Date().toLocaleTimeString();
  exec(
    `git add . && git commit -m "${date}" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(
          `Une erreur s'est produite lors du push des modifications : ${err}`
        );
        return;
      }
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Les modifications ont été poussées à ${date}`
      );
    }
  );
}

app.listen(8080, function () {
  setTimeout(gitPush, pushEveryXMinutes * 1000);
  console.log("push running");
});
