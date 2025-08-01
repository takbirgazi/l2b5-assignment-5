import { JwtPayload } from "jsonwebtoken";
import { Transaction } from "./transaction.mode";
import { QueryBuilder } from "../../utils/QueryBuilder";


const getTransactionHistory = async (payload: JwtPayload) => {
    const transactionHistory = await Transaction.find({ user: payload.userId })
        .populate([
            { path: 'user', select: 'name email role' },
            { path: 'transactionWith', select: 'name email role' }
        ]);
    return transactionHistory;
};

const getAllTransactionHistory = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Transaction.find()
        .populate([
            { path: 'user', select: 'name email role' },
            { path: 'transactionWith', select: 'name email role' }
        ]), query);

    const allTransactionHistory = queryBuilder
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        allTransactionHistory.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    };
};

export const TransactionService = {
    getTransactionHistory,
    getAllTransactionHistory,
}