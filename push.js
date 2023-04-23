const { exec } = require("child_process");
const express = require("express");

const app = express();

const pushEveryXMinutes = 10;

const args = process.argv.slice(2);
const name = args.filter((a) => a !== "-m").join(" ");

function gitPush() {
  const date =
    new Date().toLocaleDateString() + " at " + new Date().toTimeString();

  exec(
    `git add . && git commit -m "${name}" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(stdout);
        return;
      }
      console.log("\x1b[32m%s\x1b[0m", `Code pushed`);
      console.log(`   message : ${name}`);
      console.log(`   date : ${date}`);
    }
  );
}

app.listen(8080, () => {
  gitPush();
  setInterval(gitPush, pushEveryXMinutes * 1000 * 60);
  console.log("push running");
});
