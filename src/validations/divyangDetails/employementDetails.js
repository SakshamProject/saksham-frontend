import { date, object, string } from "yup";
import { CODES } from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = object({
  isEmployed: string().nullable(),
  unemployedSince: date()
    .typeError("Invalid date")
    .min(
      minMaxAge({})?.max,
      "Unemployed Since should be less than 100 years old"
    )
    .max(new Date(), "Unemployed Since should be in Past")
    .test(
      "unemployedSince",
      "Unemployed Since is required",
      (value, context) => !(context.parent?.isEmployed !== CODES?.YES && !value)
    )
    .nullable(),
  occupation: string()
    .min(3, "Applicant Occupation  must be at least 3 characters long")
    .nullable(),
  income: string().nullable(),
  fatherOccupation: string()
    .min(3, "Father Occupation must be at least 3 characters long")
    .nullable(),
  fatherIncome: string().nullable(),
  motherOccupation: string()
    .min(3, "Mother Occupation must be at least 3 characters long")
    .nullable(),
  motherIncome: string().nullable(),
  spouseOccupation: string()
    .min(3, "Spouse Occupation must be at least 3 characters long")
    .nullable(),
  spouseIncome: string().nullable(),
});
