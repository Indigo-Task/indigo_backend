import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import APIFeatures from "../utils/APIFeatures.js";


export const deleteOne = (Model) => 
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if(!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(204).json({
            status: "success",
            data: null,
        })
    });

export const updateOne = (Model) => 
catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdandUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!doc) {
        return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: doc,
    });
});;

export const createOne = (Model) => 
catchAsync(async (req, res, next) => {
    // console.log("fdsjk")
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: "success",
        data: doc,
    })
})

export const getOne = (Model ,popOptions) => 
catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
})

export const getAll = (Model) => 
catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });