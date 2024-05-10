import { object, string } from "yup";

oldPassword: "",
newPassword: "",
confirmPassword: "",

export const validationSchema = object({
  oldPassword: string().trim().required("Old password is required"),
  password: string()
    .trim()
    .required("Password is required")
    .test(
      "password",
      "Old password and new password should not be same",
      (value, context) => value !== context?.parent?.oldPassword
    )
    .matches(UPPER_CASE, "Password must contain at least one uppercase letter")
    .matches(LOWER_CASE, "Password must contain at least one lowercase letter")
    .matches(NUMBER, "Password must contain at least one number")
    .matches(
      SPECIAL_CHARACTER,
      "Password must contain at least one special character"
    )
    .min(6, "Password must be at least 6 characters long")
    .max(25, "Password cannot have more than 25 characters"),

  confirmPassword: string()
    .trim()
    .required("Confirm password is required")
    .test(
      "confirmPassword",
      "Confirm password should be same",
      (value, context) => value === context?.parent?.password
    ),
});
