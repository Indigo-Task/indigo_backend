import User from "../models/User.js";
import PushNotifications from "./PushNotifications.cjs";
import { sendMail } from "./sendMail.js";
import { sendSMS } from "./sendSMS.js";
import amqp from "amqplib/callback_api.js";

export const sendNotif = async () => {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) throw error0;
    connection.createChannel((error1, channel) => {
      if (error1) throw error1;
      const queue = "notification_tasks";

      channel.assertQueue(queue, { durable: true });
      channel.consume(
        queue,
        async (msg) => {
          const message = JSON.parse(msg.content.toString());
          console.log("Received:", message);

            const users = await User.find({ flightId: message.id });
            users.forEach(async (user) => {
                if (user.method === "Email") {
                  await sendMail(user.contact, "Flight Update Notification", message.message);
                } else if (user.method === "SMS") {
                  await sendSMS(user.contact, message.message);
                }
                await PushNotifications(user.recepientToken, message.message);
            })
          channel.ack(msg);
        },
        { noAck: false }
      );
    });
  });
};

sendNotif();