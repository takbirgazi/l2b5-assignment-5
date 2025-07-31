import { JwtPayload } from "jsonwebtoken";
import { IsActive, Role } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import statusCode from 'http-status-codes';
import { Wallet } from "./wallet.model";
import { WalletStatus } from "./wallet.interface";

interface IPayload {
    balance?: number,
    status?: WalletStatus
}

const updateWallet = async (userEmail: string, payload: IPayload, decodedToken: JwtPayload) => {
    const session = await Wallet.startSession();
    session.startTransaction()
    try {
        if (payload.balance) {
            if (payload.balance < 1) {
                throw new AppError(statusCode.NOT_FOUND, "Wrong Information Collected!");
            }
        }

        const ifUserExist = await User.findById(decodedToken.userId).session(session);
        if (!ifUserExist) {
            throw new AppError(statusCode.NOT_FOUND, "User Not Found!");
        }

        if (ifUserExist) {
            const userWallet = await Wallet.findById(ifUserExist.wallet).session(session);;
            if (userWallet?.balance && payload?.balance) {
                const { balance } = payload;
                if (userWallet.balance < 0 || userWallet.balance < balance) {
                    throw new AppError(statusCode.BAD_REQUEST, "Insufficient Balance!");
                }
                if ((userWallet.balance - balance) < 0) {
                    throw new AppError(statusCode.BAD_REQUEST, "Something Went Wrong!");
                }
                await Wallet.findByIdAndUpdate(userWallet._id, { balance: (userWallet?.balance - balance) }, { new: true, runValidators: true, session })
            }
        }

        const ifSendUserExist = await User.findOne({ email: userEmail }).session(session);
        if (!ifSendUserExist) {
            throw new AppError(statusCode.NOT_FOUND, "Sender Not Found!");
        }

        // Change Wallet Status
        if (ifUserExist && payload.status) {
            if (decodedToken.role === Role.ADMIN || decodedToken.role === Role.SUPER_ADMIN) {
                if (ifSendUserExist) {
                    await Wallet.findByIdAndUpdate(ifSendUserExist.wallet, { status: payload.status }, { new: true, runValidators: true, session })
                }
            }
        }

        // Send Balance Handle
        if (ifSendUserExist) {
            if (!ifSendUserExist.isVerified) {
                throw new AppError(statusCode.NOT_FOUND, "Sender is Not Verified!");
            }
            if (ifSendUserExist.isActive !== IsActive.ACTIVE) {
                throw new AppError(statusCode.NOT_FOUND, "Sender is Not Active!");
            }

            const sendUserWallet = await Wallet.findById(ifSendUserExist.wallet).session(session);
            if (sendUserWallet?.status !== WalletStatus.ACTIVE) {
                throw new AppError(statusCode.NOT_FOUND, "Sender Account is Blocked");
            }

            if (sendUserWallet?.balance && payload?.balance) {
                const { balance } = payload;
                if (sendUserWallet.balance < 0) {
                    throw new AppError(statusCode.BAD_REQUEST, "Something Went Wrong!");
                }
                await Wallet.findByIdAndUpdate(sendUserWallet._id, { balance: (sendUserWallet?.balance + balance) }, { new: true, runValidators: true, session })
            }
        }

        await session.commitTransaction();
        session.endSession();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const WalletService = {
    updateWallet,
}