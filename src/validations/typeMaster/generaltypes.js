import { object, string } from "yup";

export const validationSchema = () =>
  object({
    name: string().required("Type name is required"),

    // branchId: string().required("Branch is required"),
    // sheet: string().required("Attendance is required"),
  });
