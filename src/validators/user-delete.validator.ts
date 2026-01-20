import { body } from "express-validator";

export const deleteUserValidator = [

    body("id")
    .notEmpty().withMessage("id_is_required")
    .isString()
    .withMessage("id_must_be_a_string"),
];
