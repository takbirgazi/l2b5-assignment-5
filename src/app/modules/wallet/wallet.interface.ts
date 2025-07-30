import { Types } from "mongoose";

export enum WalletStatus {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED'
};

export interface IWallet {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
    balance: number;
    status: WalletStatus;
    createdAt?: Date;
    updatedAt?: Date;
}