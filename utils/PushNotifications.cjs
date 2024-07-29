var admin = require("firebase-admin");

var serviceAccount = require("../config/flight-status-tracker-ec04b-firebase-adminsdk-g5hlk-a596c266f2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const PushNotifications = async (registrationTokens, messageContent) => {
    try {
        const message = {
            data: { message: messageContent},
            token: registrationTokens,
        };
        
        admin.messaging().send(message)
        .then((response) => {
            console.log(response + ' message sent successfully');
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = PushNotifications;