import { Types } from 'mongoose';

export enum TransactionType {
    SEND_MONEY = 'SEND_MONEY',
    RECEIVE_MONEY = 'RECEIVE_MONEY',
    CASH_IN = 'CASH_IN',
    CASH_OUT = 'CASH_OUT'
}

export interface ITransaction {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    amount: number;
    transactionId: string,
    type: TransactionType;
    transactionWith: Types.ObjectId; // For transfers
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
