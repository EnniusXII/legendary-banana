import { asyncHandler } from "../middleware/asyncHandler.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";
import User from "../models/UserSchema.mjs";

export const register = asyncHandler(async (req, res, next) => {
  const {name, email, password, role} = req.body;

  const user = await User.create({name, email, password, role});

  createAndSendToken(user, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid email/password", 401));
  }

  const correctPassword = await user.validatePassword(password);

  if (!correctPassword) {
    return next(new ErrorResponse("Invalid email/password", 401));
  }
  
  createAndSendToken(user, 200, res);
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({success: true, statusCode: 200, data: user});
});

export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, statusCode: 200, data: user });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.validatePassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Wrong password", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  createAndSendToken(user, 200, res);
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return next(new ErrorResponse("Please enter email for recovery", 400))
  };

  let user = await User.findOne({email});

  if (!user)
    return next(new ErrorResponse(`User: ${email} not found`, 400)
  );

  const resetToken = user.createResetPasswordToken();
  await user.save({validateBeforeSave: false});

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  res.status(200).json({success: true, statusCode: 201, data: {token: resetToken, url: resetUrl}});
});

// @desc    Återställ lösenord
// @route   PUT /api/v1/auth/resetpassword/:token
// @access  PUBLIC
export const resetPassword = asyncHandler(async (req, res, next) => {
  const password = req.body.password;
  const token = req.params.token;

  if (!password) return next(new ErrorResponse("Please enter a password", 400));

  let user = await User.findOne({resetPasswordToken: token});

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  await user.save();

  createAndSendToken(user, 200, res);
});

const createAndSendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  res.status(statusCode).json({success: true, statusCode, token});
};
