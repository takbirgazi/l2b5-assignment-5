import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import statusCode from "http-status-codes";
import { User } from "./user.model";
import { envVars } from "../../config/env";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
        throw new AppError(statusCode.BAD_REQUEST, "User Already Exist");
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));

    const authProvider: IAuthProvider = { provider: "credential", providerId: email as string }

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    });
    return user
};


export const UserService = {
    createUser,
}