import { object, string } from "yup";

export const validationSchema = object({
  stateId: string().required("Seva kendra state is required"),
  districtId: string().required("Seva kendra district is required"),
  sevaKendraId: string().required("Seva kendra name is required"),
  designation: string()
    .trim()
    .required("Designation is required")
    .min(3, "Designation must be at least 3 characters long")
    .max(255, "Designation cannot have more than 255 characters"),
});
