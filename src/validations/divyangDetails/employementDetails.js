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
  income: string()
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0) {
        context.createError({ message: "Enter Valid Personal Income" });
        return false;
      }
      return true;
    })
    .nullable(),
  fatherOccupation: string()
    .min(3, "Father Occupation must be at least 3 characters long")
    .nullable(),
  fatherIncome: string()
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0) {
        context.createError({ message: "Enter Valid Father Income" });
        return false;
      }
      return true;
    })
    .nullable(),
  motherOccupation: string()
    .min(3, "Mother Occupation must be at least 3 characters long")
    .nullable(),
  motherIncome: string()
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0) {
        context.createError({ message: "Enter Valid Mother Income" });
        return false;
      }
      return true;
    })
    .nullable(),
  spouseOccupation: string()
    .min(3, "Spouse Occupation must be at least 3 characters long")
    .nullable(),
  spouseIncome: string()
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0) {
        context.createError({ message: "Enter Valid Spouse Income" });
        return false;
      }
      return true;
    })
    .nullable(),
});
