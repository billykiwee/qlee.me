const { exec } = require("child_process");

setTimeout(gitPush, 10_000);

function gitPush() {
  exec(
    `git add . && git commit -m "${new Date()}" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(
          `Une erreur s'est produite lors du push des modifications : ${err}`
        );
        return;
      }
      console.log(`Les modifications ont été poussées à ${new Date()}`);
    }
  );
}
