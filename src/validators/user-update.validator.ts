import { body } from "express-validator";

export const updateUserValidator = [

    body("id")
        .notEmpty().withMessage("id_is_required")
        .isString()
        .withMessage("id_must_be_a_string"),

    body("name")
        .optional()
        .isString()
        .withMessage("name_must_be_a_string")
        .trim()
        .notEmpty().withMessage("name_is_required"),

    body("email")
        .optional()
        .isString()
        .withMessage("email_must_be_a_string")
        .notEmpty()
        .withMessage("email_is_required")
        .isEmail()
        .withMessage("email_must_be_valid"),

    body("birthday")
        .optional()
        .isString()
        .withMessage("birthday_must_be_a_string")
        .notEmpty()
        .withMessage("birthday_is_required")
        .isISO8601()
        .withMessage("birthday_must_be_in_iso8601_format_yyyy_mm_dd"),


    body("timezone")
        .optional()
        .isString()
        .withMessage("timezone_must_be_a_string")
        .notEmpty()
        .withMessage("timezone_is_required")
        .custom((value) => {
            try {
                Intl.DateTimeFormat(undefined, { timeZone: value });
                return true;
            } catch {
                throw new Error("invalid_IANA_timezone");
            }
        }),
];
