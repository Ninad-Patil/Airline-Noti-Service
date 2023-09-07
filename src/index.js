const { serverConfig, logger } = require("./config");
const apiRoutes = require("./routes");
const express = require("express");
const amqplib = require("amqplib");
const { emailService } = require("./services");
async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    await channel.consume("noti-queue", async (data) => {
      // console.log(`${Buffer.from(data.content)}`);
      const obj = JSON.parse(`${Buffer.from(data.content)}`);
      await emailService.sendEmail(
        "tes1ing.dev@gmail.com",
        obj.recepientEmail,
        obj.subject,
        obj.text
      );
      channel.ack(data);
    });
  } catch (error) {}
}
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, async () => {
  console.log(`server running on port ${serverConfig.PORT}`);
  logger.info("Successfully started the server", "root", {});
  await connectQueue();
});
