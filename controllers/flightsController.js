import User from "../models/User.js";
import Flights from "../models/flights.js";
import APIFeatures from "../utils/APIFeatures.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendNotif } from "../utils/sendNotif.js";
import { createOne, getAll, getOne } from "./handlerFactory.js"
import amqp from "amqplib/callback_api.js";

const clients = [];

export const updateFlight = catchAsync(async (req, res, next) => {

    const updatedFlight = await Flights.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // Send notification to each user
    let notificationMessage = `Flight ${updatedFlight.flightId} has been updated.`;
    if (req.body?.departureGate){
        notificationMessage = notificationMessage + `Departure Gate Change to ${req.body.departureGate}.  `
    }
    if (req.body?.arrivalGate){
        notificationMessage = notificationMessage + `Arrival Gate Change to ${req.body.arrivalGate}.`
    }
    if (req.body?.status){
        notificationMessage = notificationMessage + `Status: ${updatedFlight.status}.`
    }
    if (req.body?.actualDeparture){
        notificationMessage = notificationMessage + `Flight will depart at ${req.body.actualDeparture}`
    }
    if (req.body?.actualArrival){
        notificationMessage = notificationMessage + `Flight will arrive at ${req.body.actualDeparture}`
    }

    const features = new APIFeatures(Flights.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;
    while (clients.length > 0) {
        const client = clients.pop();
        client.status(200).json({ status: 'success', result: doc.length, data: doc });
    }
    amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0)  throw error0;
    connection.createChannel((error1, channel) => {
      if (error1) throw (error1);
      const queue = 'notification_tasks';
        const message = JSON.stringify({id: updatedFlight.flightId, message: notificationMessage })
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      console.log('Sent to queue:', message);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
    // users.forEach(async (user) => {
    //     user.notification.push({
    //         message: notificationMessage,
    //         timestamp: new Date(),
    //     });
    //     await user.save();

    //     // Send notification
    //     await sendNotif(user, notificationMessage);
    // });

    res.status(200).json({
        status: "success",
        data: {
            updatedFlight
        },
    });
});

export const deleteFlight = catchAsync(async (req, res, next) => {
    await Flights.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const createFlight = createOne(Flights);
export const getAllFlights = catchAsync(async (req, res, next) => {
    const lastData = req.query.lastData;
    const features = new APIFeatures(Flights.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    // SEND RESPONSE
    if (JSON.stringify(doc) !== lastData) {
        res.status(200).json({ status: 'success', result: doc.length, data: doc });
    }else{
        clients.push(res);
    }
  });;
export const getFlight = getOne(Flights)
