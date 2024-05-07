import { object, string } from "yup";

export const validationSchema = object({
  userName: string()
    .trim()
    .required("User name is required")
    .max(255, "User name must not exceed 255 characters"),
});
