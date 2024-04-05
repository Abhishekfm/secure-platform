import * as Yup from "yup";
import { NUMBER } from "../helper/constant";

const VALIDATION_MESSAGES = {
  EMAIL: { REQUIRED: "Email is mandatory.", INVALID: "Invalid email address." },
  PASSWORD: {
    REQUIRED: "Password is mandatory.",
    PASSWORD_MATCH: "New password must be different from old password",
    MIN_LENGTH: "Password must be at least 8 characters.",
    MAX_LENGTH: "Password should not be greater than 128 characters",
    LOWER_CASE: "Password must contain at least one lowercase letter",
    UPPER_CASE: "Password must contain at least one uppercase letter",
    NUMBER: "Password must contain at least one number",
    SYMBOL_CASE:
      "Password must contain at least one special character (@$!%*?&)",
    FORMAT:
      "Password must include a special symbol (!, *, $, etc.) and at least one number",
    MATCH: "Confirm New Password must match with New Password",
  },
};

export const LOGIN_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email(VALIDATION_MESSAGES.EMAIL.INVALID)
    .max(NUMBER.ONE_HUNDRED)
    .required(VALIDATION_MESSAGES.EMAIL.REQUIRED),
  password: Yup.string().required(VALIDATION_MESSAGES.PASSWORD.REQUIRED),
});

// .min(8, VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
//     .max(128, VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH)
//     .matches(/^(?=.*[a-z])/, VALIDATION_MESSAGES.PASSWORD.LOWER_CASE)
//     .matches(/^(?=.*[A-Z])/, VALIDATION_MESSAGES.PASSWORD.UPPER_CASE)
//     .matches(/^(?=.*\d)/, VALIDATION_MESSAGES.PASSWORD.NUMBER)
//     .matches(/^(?=.*[@$!%*?&])/, VALIDATION_MESSAGES.PASSWORD.SYMBOL_CASE)
