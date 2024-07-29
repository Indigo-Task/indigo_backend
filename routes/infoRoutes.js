import express from "express";
import fs from "fs";
import AppError from "../utils/AppError.js";
import { parse } from "csv-parse";
const router = express.Router();

router.route("/airports").get((req, res, next) => {
    try {
        const rows = [];
        fs.createReadStream("./config/airports.csv")
        .pipe(parse({ delimiter: "," }))
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", (rowCount) => {
          const [headers, ...dataRows] = rows;
          const result = [];
          for (let i = 0; i < dataRows.length; i++) {
            const row = dataRows[i];
            const obj = {};
            
            // Create an object for each row using the headers as keys
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
        
            // Push the object to the result array
            result.push(obj);
        }
          res.status(200).json({ status: 'success', data: result});
        });
    } catch (error) {
        next(new AppError(500, error));
    }
})

export default router;