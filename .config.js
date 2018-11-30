const path = require("path");

module.exports = {
  user: process.env.ASSIGNMENT_USER_EMAIL,
  password: process.env.ASSIGNMENT_USER_PASSWORD,
  host: "imap.gmail.com",
  port: 993,
  tls: true,

  http_port: 3000,
  http_hostname: "0.0.0.0",
  defaultFolder: "INBOX",
  mongoconstring: process.env.MONGO_CON_STRING,
  MAIL_DIR: path.join(__dirname, "./MAIL_DIR/")
};
