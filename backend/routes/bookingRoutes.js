import asyncHandler from "express-async-handler";

import Booking from "../models/bookingModel.js"; 
import express from "express";
const router = express.Router();

//get all bookings
router.get(
    "/getAll",
    asyncHandler(async (req, res) => {
      const booking = await Booking.find({});
  
      res.json({ booking });
    })
  );
  
  //create a booking
  
  router.post(
    "/create",
    asyncHandler(async (req, res) => {
      const booking = new Booking({
        booking_id: req.body.booking_id,
        location_id: req.body.location_id,
        drone_shot_id: req.body.drone_shot_id,
        createdTime: req.body.createdTime,
      });
  
      const createdBooking = await booking.save();
      res.status(201).json(createdBooking);
    })
  );
  
  //edit a booking
  
  router.put(
    "/edit/:id",
    asyncHandler(async (req, res) => {
      const { booking_id, location_id, drone_shot_id, createdTime } = req.body;
  
      const booking = await Booking.findById(req.params.id);
  
      if (booking) {
        booking.booking_id = booking_id;
        booking.location_id = location_id;
        booking.drone_shot_id = drone_shot_id;
        booking.createdTime = createdTime;
  
        const updatedProduct = await booking.save();
        res.json(updatedProduct);
      } else {
        res.status(404);
        throw new Error("Booking not found");
      }
    })
  );
  
  // delete a booking
  
  router.delete("/delete/:id", asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    console.log("fdf",booking)
    if (booking) {
      await booking.deleteOne();
      res.json({ message: "booking removed" });
    } else {
      res.status(404);
      throw new Error("booking not found");
    }
  }));


  // @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id",asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error("booking not found");
  }
}));

  export default router;
