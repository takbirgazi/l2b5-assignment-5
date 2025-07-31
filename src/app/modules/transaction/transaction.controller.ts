import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "http-status-codes";
import { TransactionService } from "./transaction.service";
import { JwtPayload } from "jsonwebtoken";



const getTransactionHistory = catchAsync(async (req: Request, res: Response) => {
    const payload = req.user;
    const transaction = await TransactionService.getTransactionHistory(payload as JwtPayload);
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Transaction Retrieve Successfully!",
        data: transaction
    });
})


export const TransactionController = {
    getTransactionHistory,
}