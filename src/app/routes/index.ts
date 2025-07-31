import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { WalletRouters } from "../modules/wallet/wallet.route";
import { TransactionRouters } from "../modules/transaction/transaction.route";


export const router = Router();

const moduleRoute = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: AuthRouters
    },
    {
        path: "/wallet",
        route: WalletRouters
    },
    {
        path: "/transaction",
        route: TransactionRouters
    },
];

moduleRoute.forEach(route => {
    router.use(route.path, route.route);
})