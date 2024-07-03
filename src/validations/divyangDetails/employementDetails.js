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
  occupation: string().nullable(),
  income: string().nullable(),
  fatherOccupation: string().nullable(),
  fatherIncome: string().nullable(),
  motherOccupation: string().nullable(),
  motherIncome: string().nullable(),
  spouseOccupation: string().nullable(),
  spouseIncome: string().nullable(),
});
