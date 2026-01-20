import { body } from "express-validator";

export const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("name_is_required"),

    body("email")
        .notEmpty()
        .withMessage("email_is_required")
        .isEmail()
        .withMessage("valid_email_is_required"),

    body("birthday")
        .notEmpty()
        .withMessage("birthday_is_required")
        .isISO8601()
        .withMessage("birthday_must_be_in_iso8601_format_yyyy_mm_dd"),

    body("timezone")
        .notEmpty()
        .withMessage("timezone_is_required")
        .isString()
        .withMessage("timezone_must_be_string")
        .custom((value) => {
            try {
                Intl.DateTimeFormat(undefined, { timeZone: value });
                return true;
            } catch {
                throw new Error("invalid_IANA_timezone");
            }
        }),
];
