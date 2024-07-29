import User from "../models/User.js";
import Flights from "../models/flights.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendNotif } from "../utils/sendNotif.js";
import { createOne, getAll, getOne } from "./handlerFactory.js"


export const updateFlight = catchAsync(async (req, res, next) => {

    const updatedFlight = await Flights.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    const users = await User.find({ flightId: updatedFlight.flightId });

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

    users.forEach(async (user) => {
        user.notification.push({
            message: notificationMessage,
            timestamp: new Date(),
        });
        await user.save();

        // Send notification
        await sendNotif(user, notificationMessage);
    });

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
export const getAllFlights = getAll(Flights);
export const getFlight = getOne(Flights);