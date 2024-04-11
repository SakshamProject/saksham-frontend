import { object, string } from "yup";

export const validationSchema = object({
  serviceTypeId: string().required("Service Type is required"),
  name: string()
    .trim()
    .min(3, "Service Name must be at least 3 characters long")
    .required("Service Name is required")
    .max(255, "Name cannot have more than 255 characters"),
});
