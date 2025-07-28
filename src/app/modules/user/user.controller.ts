import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import statusCode from "http-status-codes";
import { UserService } from "./user.service";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await UserService.createUser(payload);
    sendResponse(res, {
        statusCode: statusCode.CREATED,
        success: true,
        message: "User Created Successfully!",
        data: user
    })
})



export const UserControllers = {
    createUser,
}