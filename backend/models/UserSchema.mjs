import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"

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
        minlength: 4,
        select: false,
      },
      resetPasswordToken: String,
      resetPasswordTokenExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.validatePassword = async function(passwordToCheck) {
    return await bcrypt.compare(passwordToCheck, this.password);
};

userSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TTL,
    });
};

userSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordTokenExpire = Date.now() + 1000 * 60 * 10;
  
    return this.resetPasswordToken;
  };

export default mongoose.model("User", userSchema);