# INDIGO BACKEND
## ABOUT
Indigo Backend Application provides real-time updates on flight statuses and sends notifications to users about any changes.

## TOOLS AND TECH STACK
1. Node.js
2. Express
3. MongoDB
4. Nodemailer
5. D7 SMS API
6. Firebase sdk
7. RabbitMQ

## REQUIREMENTS
1. Nodejs.
2. RabbitMQ server
3. Npm / Yarn package manager

## DESCRIPTION
The Indigo App is designed to provide real-time flight information and notifications. Users can track flights, receive updates on flight status changes, and manage their notification preferences with ease.
### Key Features
1. Real-Time Flight Updates: Get up-to-date information on flight status, including delays, cancellations, and gate changes.
2. Notification System: Receive notifications via email, SMS, or push notifications.
3. Flight Search: Search for flights by flight number, airline, or route.
4. Comprehensive Flight Details: Access detailed information such as departure/arrival times, terminals, and gate information.

  ### USAGE
1. Real-Time Updates:
   For real-time updates, the application uses long polling. When a user makes an API call, the server checks if the data has changed since the last request. If the data is unchanged, the server waits for updates before sending a response.
2. Notifications:
   Application uses a rabbitmq as the message broker, it sends the message through email or SMS (You have to choose) and Push notification to the end user.
   <br/>
   To get notifications the user has to search the flights on the client app and click on the bell icon to start receiving notifications. Now whenever there is a change in the flight status the notification is sent to the user.
  ### Example
To get a notification subscribe to a particular flight.<br/>
For changing the flight status:<br/>
endpoint => "/api/v1/flights:id"<br/>
Example: 
endpoint => http://localhost:3000/api/v1/flights/66a38342ea6bc3ddbced53aa
```
Request Body => {
    "arrivalGate": "E3",
    "departureGate": "C2"
}
```
```
Response: {
    "status": "success",
    "data": {
        "updatedFlight": {
            "_id": "66a38342ea6bc3ddbced53aa",
            "flightId": "6E 2341",
            "airline": "Indigo",
            "status": "On Time",
            "departureGate": "C2",
            "arrivalGate": "E3",
            "scheduledDeparture": "2024-07-28T14:00:00.000Z",
            "scheduledArrival": "2024-07-26T18:00:00.000Z",
            "actualDeparture": null,
            "actualArrival": null,
            "__v": 0
        }
    }
}
```
## API ENDPOINT
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/21675936-3945d6e3-095b-4aed-baa7-58a6e9c6b3f4?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D21675936-3945d6e3-095b-4aed-baa7-58a6e9c6b3f4%26entityType%3Dcollection%26workspaceId%3D96b26132-99f7-43f7-944e-4ab06b288f90)
