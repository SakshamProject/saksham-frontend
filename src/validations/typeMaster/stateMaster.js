import { object, string } from "yup";

export const validationSchema = ({ name, label }) =>
  object({
    [name]: string()
      .trim()
      .required(label + " is required"),
    stateId: string().required("State is required"),
    districtId: string().required("District is required"),
  });
