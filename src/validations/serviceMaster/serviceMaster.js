import { object, string } from "yup";

export const validationSchema = object({
  serviceTypeId: string().required("Service Type is required"),
  name: string().trim().required("Service Name is required"),
});
