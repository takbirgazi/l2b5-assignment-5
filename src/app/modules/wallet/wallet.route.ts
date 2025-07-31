import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateWalletZodSchema } from "./wallet.validation";
import { WalletController } from "./wallet.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";



const router = Router();

router.patch("/:email", checkAuth(...Object.values(Role)), validateRequest(updateWalletZodSchema), WalletController.updateWallet);

export const WalletRouters = router;