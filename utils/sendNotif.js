import PushNotifications from "./PushNotifications.cjs";
import { sendMail } from "./sendMail.js";
import { sendSMS } from "./sendSMS.js";

export const sendNotif = async (user, message) => {
    if (user.method === 'Email') {
        await sendMail(user.contact, 'Flight Update Notification', message);
    } else if (user.method === 'SMS') {
        await sendSMS(user.contact, message);
    }
    await PushNotifications(user.recepientToken, message);
};