import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
