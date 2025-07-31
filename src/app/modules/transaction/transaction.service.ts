import { JwtPayload } from "jsonwebtoken";
import { Transaction } from "./transaction.mode";


const getTransactionHistory = async (payload: JwtPayload) => {
    const transactionHistory = await Transaction.find({ user: payload.userId });
    return transactionHistory;
}

export const TransactionService = {
    getTransactionHistory,
}