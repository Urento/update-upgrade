require("dotenv-safe").config();

const exec = require("child_process").exec;
import nodemailer from "nodemailer";

const sendMail = async (message: string) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, //"Fred Foo 👻" <foo@example.com>
    to: process.env.EMAIL_TO, // could potentialy also be a list of receivers
    subject: "Server APT Update and APT Upgrade",
    text: message,
  });

  console.log("Email sent: %s", info.messageId);
};

const main = async () => {
  console.log("Started...");
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
            sendMail(error);
            console.warn(error);
          } else if (stdout) {
            sendMail(stdout);
            console.log(stdout);
          } else {
            sendMail(stderr);
            console.log(stderr);
          }
          resolve(stdout ? true : false);
        }
      );
    });
  }, msToMidnight);
};

main().catch(console.error);
