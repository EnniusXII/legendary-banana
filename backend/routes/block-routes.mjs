import express from "express";
import { mineBlock } from "../controllers/block-controller.mjs";
import { authorize, protect } from "../middleware/authorization.mjs";

const router = express.Router();

router.route("/mine").post(protect, authorize("admin", "manager", "user"), mineBlock);
export default router;
