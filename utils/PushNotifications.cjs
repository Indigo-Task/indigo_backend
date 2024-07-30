var admin = require("firebase-admin");

var serviceAccount = {
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
    "client_x509_cert_url": process.env.CLIENT,
    "universe_domain": process.env.UNIVERSE_DOMAIN
  }
  
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