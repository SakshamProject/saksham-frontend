import { object, string } from "yup";
import {
  LOWER_CASE,
  NUMBER,
  UPPER_CASE,
} from "../../constants/globalConstants";

export const validationSchema = object({
  password: string()
    .trim()
    .required("Password is required")
    .matches(UPPER_CASE, "Password must contain at least one uppercase letter")
    .matches(LOWER_CASE, "Password must contain at least one lowercase letter")
    .matches(NUMBER, "Password must contain at least one number")
    .min(7, "Password must be 7 characters long")
    .max(24, "Password cannot have more than 24 characters"),
  confirmPassword: string()
    .trim()
    .required("Confirm password is required")
    .test(
      "isConfirmPassword",
      "Confirm password should be same",
      (value, context) => !(!!value && value !== context?.parent?.password)
    ),
});
