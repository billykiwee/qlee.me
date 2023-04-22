const { exec } = require("child_process");

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
      console.log(`Les modifications ont été poussées à ${date}`);
    }
  );
}

setTimeout(gitPush, pushEveryXMinutes * 1000);
