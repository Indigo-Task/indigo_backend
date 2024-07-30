import axios from "axios";

export const sendSMS = async (contact, message) => {
    var data = JSON.stringify({
        "messages": [
          {
            "channel": "sms",
            "recipients": [
                contact
            ],
            "content": message,
            "msg_type": "text",
            "data_coding": "text"
          }
        ],
        "message_globals": {
          "originator": "SignOTP",
        }
      });
    var config = {
        method: 'post',
        url: 'https://api.d7networks.com/messages/v1/send',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'Authorization': 'Bearer ' + process.env.SMS_SERVICE_TOKEN
        },
        data : data
      };

try {
    const response = await axios.request(config);
	console.log(response.data);
} catch (error) {
    console.error(error);
}
}