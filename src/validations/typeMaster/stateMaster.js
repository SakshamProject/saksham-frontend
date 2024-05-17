import { object, string } from "yup";

export const validationSchema = ({ name, label }) =>
  object({
    [name]: string()
      .trim()
      .min(3, `${label} must be at least 3 characters long`)
      .required(`${label} is required`)
      .max(255, `${label} cannot have more than 255 characters`),
    stateId: string().required("State is required"),
    districtId: string().required("District is required"),
  });
