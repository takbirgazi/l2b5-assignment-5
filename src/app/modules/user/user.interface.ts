import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT"
};

export interface IAuthProvider {
    provider: "google" | "credential",
    providerId: string
};

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
};


export interface IUser {
    _id?: Types.ObjectId,
    name: string,
    email: string,
    wallet: Types.ObjectId,
    password?: string,
    phone?: string,
    picture?: string,
    address?: string,
    isDeleted?: boolean,
    isActive?: IsActive,
    isVerified?: boolean,
    role: Role,
    auths: IAuthProvider[],
    createdAt?: Date,
}