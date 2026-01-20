import { body } from "express-validator";

export const deleteUserValidator = [

    body("id")
        .notEmpty().withMessage("id cannot be empty")
        .isString()
        .withMessage("id must be a string")
];
