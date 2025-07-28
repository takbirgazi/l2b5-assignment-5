import { Request, Response, Router } from "express";


const router = Router();

router.get("/register", (req: Request, res: Response) => {
    res.send("Welcome");
})


export const userRoutes = router;