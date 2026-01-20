import { body } from "express-validator";

export const updateUserValidator = [

    body("id")
        .isString()
        .withMessage("id must be a string")
        .notEmpty().withMessage("id cannot be empty"),

    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .notEmpty().withMessage("Name cannot be empty"),

    body("email")
        .optional()
        .isString()
        .withMessage("email must be a string")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Valid email is required"),

    body("birthday")
        .optional()
        .isString()
        .withMessage("email must be a string")
        .notEmpty()
        .withMessage("birthday is required")
        .isISO8601()
        .withMessage("Birthday must be in ISO8601 format (YYYY-MM-DD)"),

    body("timezone")
        .optional()
        .isString()
        .withMessage("email must be a string")
        .notEmpty()
        .withMessage("Timezone is required")
        .isString()
        .withMessage("Timezone must be a valid IANA timezone e.g. America/New_York")
        .custom((value) => {
            try {
                Intl.DateTimeFormat(undefined, { timeZone: value });
                return true;
            } catch {
                throw new Error("Invalid IANA timezone");
            }
        }),
];
