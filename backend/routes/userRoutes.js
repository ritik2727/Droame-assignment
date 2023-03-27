import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import express from "express";
const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/create
// @access  Public
router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { name, email, phoneNo, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      phoneNo,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        phoneNo: user.phoneNo,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get(
  "/allUsers",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
router.get(
  "/userById/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
router.get(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phoneNo=req.body.phoneNo ||user.phoneNo,
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNo: updatedUser.phoneNo,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default router;