import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    booking_id: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    location_id: {
      type: String,
      max: 500,
      required: true,
    },
    drone_shot_id: {
      type: String,
      max: 500,
      required: true,
    },
    createdTime: {
      type: String,
      max: 500,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

