import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TransactionController } from "./transaction.controller";



const router = Router();

router.get("/history", checkAuth(Role.USER, Role.AGENT), TransactionController.getTransactionHistory);

export const TransactionRouters = router;