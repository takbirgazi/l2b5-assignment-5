import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createZodSchema } from "./user.validation";
import { UserControllers } from "./user.controller";


const router = Router();

router.post("/register", validateRequest(createZodSchema), UserControllers.createUser);


export const userRoutes = router;