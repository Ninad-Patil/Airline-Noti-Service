const { serverConfig, logger } = require("./config");
const apiRoutes = require("./routes");
const express = require("express");

const mailsender = require("./config/email-config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  console.log(`server running on port ${serverConfig.PORT}`);
  logger.info("Successfully started the server", "root", {});
  try {
    const response = mailsender.sendMail({
      from: serverConfig.GMAIL_EMAIL,
      to: "ninad.patil198@gmail.com",
      subject: "testing if the service is working or not",
      text: "hoping it works",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
