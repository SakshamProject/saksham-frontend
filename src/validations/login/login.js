import { object, string } from "yup";
import {
  LOWER_CASE,
  NUMBER,
  SPECIAL_CHARACTER,
  UPPER_CASE,
} from "../../constants/globalConstants";

export const validationSchema = object({
  userName: string()
    .trim()
    .required("User name is required")
    .max(255, "User name must not exceed 255 characters"),

  password: string()
    .trim()
    .required("Password is required")
    .matches(UPPER_CASE, "Password must contain at least one uppercase letter")
    .matches(LOWER_CASE, "Password must contain at least one lowercase letter")
    .matches(NUMBER, "Password must contain at least one number")
    .matches(
      SPECIAL_CHARACTER,
      "Password must contain at least one special character"
    )
    .min(7, "Password should be at least 7 characters")
    .max(25, "Password cannot have more than 25 characters"),
});
