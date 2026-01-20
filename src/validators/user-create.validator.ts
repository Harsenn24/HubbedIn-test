import { body } from "express-validator";

export const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Valid email is required"),

    body("birthday")
        .notEmpty()
        .withMessage("birthday is required")
        .isISO8601()
        .withMessage("Birthday must be in ISO8601 format (YYYY-MM-DD)"),

    body("timezone")
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
