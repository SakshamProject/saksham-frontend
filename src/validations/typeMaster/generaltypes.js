import { object, string } from "yup";

export const validationSchema = () =>
  object({
    name: string()
      .required("Type name is required")
      .max(255, "Name cannot have more than 255 characters"),

    // branchId: string().required("Branch is required"),
    // sheet: string().required("Attendance is required"),
  });
