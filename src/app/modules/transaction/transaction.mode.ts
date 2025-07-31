import { Schema, model } from 'mongoose';
import { ITransaction, TransactionType } from './transaction.interface';


const transactionSchema = new Schema<ITransaction>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be positive'],
    },
    type: {
        type: String,
        enum: Object.values(TransactionType),
        required: true,
    },
    transactionWith: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

export const Transaction = model<ITransaction>('Transaction', transactionSchema);