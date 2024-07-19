import express from "express";
import { register, login, getMe, forgotPassword, resetPassword, updateUserDetails, updatePassword } from "../controllers/auth-controller.mjs";
import { protect } from "../middleware/authorization.mjs";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);
router.route("/me").get(protect, getMe);
router.route("/updateuser").put(protect, updateUserDetails);
router.route("/updatepassword").put(protect, updatePassword);

export default router;
