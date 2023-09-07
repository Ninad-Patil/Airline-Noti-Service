const dotenv = require("dotenv");

//the moment you call dotenv.config it loads the port in global process obj
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
};
