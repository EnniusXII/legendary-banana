import express from "express";
import { addTransaction, getTransactionPool, getWalletBalance, mineTransactions } from "../controllers/transaction-controller.mjs";
import { authorize, protect } from "../middleware/authorization.mjs";

const router = express.Router();

router.route("/transaction").post(protect, authorize("admin", "manager", "user"), addTransaction);
router.route("/transactions").get(protect, authorize("admin", "manager", "user"), getTransactionPool);
router.route("/mine").get(protect, authorize("admin", "manager", "user"), mineTransactions);
router.route("/balance").get(getWalletBalance);

export default router;
