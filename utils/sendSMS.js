import axios from "axios";

export const sendSMS = async (contact, message) => {

    const options = {
        method: 'POST',
        url: 'https://d7sms.p.rapidapi.com/messages/v1/send',
        headers: {
    'x-rapidapi-key': '9aa1ed88acmshf35961677c18d60p1e668bjsn439dda8bdc4c',
    'x-rapidapi-host': 'd7sms.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
      messages: [
          {
              channel: 'sms',
              originator: 'D7-RapidAPI',
              recipients: [
                contact
                ],
                content: message,
                data_coding: 'text'
            }
        ]
    }
};

try {
    const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
    console.error(error);
}
}