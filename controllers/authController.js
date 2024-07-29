import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { createOne, getAll, getOne } from "./handlerFactory.js"


export const updateMe = catchAsync(async (req, res, next) => {

    const update = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: {
            update
        },
    });
});

export const deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const createUser = createOne(User);
export const getAllUser = getAll(User);
export const getUser = getOne(User);