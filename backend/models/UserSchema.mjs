import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add you name"],
      },
      email: {
        type: String,
        required: [true, "Please add you email"],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      role: {
        type: String,
        enum: ["user", "manager"],
        default: "user",
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
});

export default mongoose.model("User", userSchema);