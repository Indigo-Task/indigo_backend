import mongoose from "mongoose";

const FlightSchema = mongoose.Schema({
    flightId: {
        type: String,
        required: true,
    },
    airline: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    departureGate: {
        type: String,
    },
    arrivalGate: {
        type: String,
    },
    scheduledDeparture: {
        type: Date,
        required: true,
    },
    scheduledArrival: {
        type: Date,
        required: true,
    },
    actualDeparture: {
        type: Date,
    },
    actualArrival: {
        type: Date
    }
})

const Flights = mongoose.model("Flights", FlightSchema);

export default Flights;