const { exec } = require("child_process");
const express = require("express");
const app = express();

const args = process.argv.slice(2);

const cmds = {
  loop: "-l",
  message: "-m",
};

const CLI = {
  message: args
    .splice(args.indexOf(cmds.message) + 1, args.indexOf(cmds.loop) - 1)
    .join(" "),
  loop: {
    active: args.includes(cmds.loop),
    time: Number(
      args.splice(args.indexOf(cmds.loop), args.indexOf(cmds.loop) + 1)[1]
    ),
  },
  date: new Date().toLocaleDateString() + " at " + new Date().toTimeString(),
};
console.log(args.indexOf("-m" | "-mes"));

function gitPush() {
  //const cmd = `git add . && git commit -m "${name}" && git push`;
  const cmd = "lool";
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(stdout);
      return;
    }
    console.log("\x1b[32m%s\x1b[0m", `Code pushed`);
    console.log(`   message : ${CLI.message}`);
    console.log(`   date : ${CLI.date}`);
  });
}

app.listen(8080, () => {
  /* if (loop.active) {
    setInterval(gitPush, loop.time * 1000 * 60);
  } */

  exec("lol :", (err, stdout, stderr) => {
    console.log(stderr);
  });
  gitPush();

  console.log("push running");
});
