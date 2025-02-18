import { object, string } from "yup";

export const validationSchema = object({
  stateId: string().required("Seva kendra state is required"),
  districtId: string().required("Seva kendra district is required"),
  sevaKendraId: string().required("Seva kendra name is required"),
  designation: string()
    .trim()
    .required("Designation is required")
    .max(255, "Designation cannot have more than 255 characters"),
});
