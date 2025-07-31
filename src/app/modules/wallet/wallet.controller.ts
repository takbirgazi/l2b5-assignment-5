import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import statusCode from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";
import { JwtPayload } from "jsonwebtoken";

const updateWallet = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userEmail = req.params.email;
    const decodedToken = req.user as JwtPayload;

    const user = await WalletService.updateWallet(userEmail, payload, decodedToken);
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Information Update Successfully!",
        data: user
    })
});

export const WalletController = {
    updateWallet,
}