require("dotenv-safe").config();

const exec = require("child_process").exec;

const sendMail = (err: boolean, message: string) => {
  if (err) {
  }
};

const main = () => {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const msToMidnight = night.getTime() - now.getTime();

  setTimeout(() => {
    return new Promise((resolve) => {
      exec(
        "sudo apt update && sudo apt upgrade -y",
        { maxBuffer: 1024 * 500 },
        (error: any, stdout: any, stderr: any) => {
          if (error) {
            console.warn(error);
          } else if (stdout) {
            console.log(stdout);
          } else {
            console.log(stderr);
          }
          resolve(stdout ? true : false);
        }
      );
    });
  }, msToMidnight);
};

main();
