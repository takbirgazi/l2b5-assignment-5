import AppError from "../../errorHelpers/AppError";
import statusCode from "http-status-codes";
import { User } from "./user.model";
import { envVars } from "../../config/env";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { IAuthProvider, IUser, Role } from "./user.interface";

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

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
        if (userId !== decodedToken.userId) {
            throw new AppError(statusCode.FORBIDDEN, "You are not authorize!");
        }
    }

    const ifUserExist = await User.findById(userId);
    if (!ifUserExist) {
        throw new AppError(statusCode.NOT_FOUND, "User Not Found!");
    }

    if (decodedToken.role === Role.ADMIN && ifUserExist.role === Role.SUPER_ADMIN) {
        throw new AppError(statusCode.FORBIDDEN, "You are not authorize!");
    }

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
            throw new AppError(statusCode.FORBIDDEN, "You are not authorize!");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
            throw new AppError(statusCode.FORBIDDEN, "You are not authorize!");
        }
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

    return newUpdateUser;
};

const getAllUser = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(User.find(), query);

    const totalUserData = queryBuilder
        .search(userSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        totalUserData.build(),
        queryBuilder.getMeta()
    ])
    return {
        data,
        meta
    }
};

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};

const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");
    return {
        data: user
    }
};



export const UserService = {
    createUser,
    getAllUser,
    updateUser,
    getMe,
    getSingleUser,
}