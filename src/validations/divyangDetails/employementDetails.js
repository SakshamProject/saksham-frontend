import { date, object, string } from "yup";
import { CODES } from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = object({
  isEmployed: string().nullable(),
  unemployedSince: date()
    .typeError("Invalid date")
    .min(minMaxAge().max, "Unemployed Since should be less than 100 years old")
    .max(new Date(), "Unemployed Since should be in Past")
    .test(
      "unemployedSince",
      "Unemployed Since is required",
      (value, context) => !(context.parent?.isEmployed !== CODES?.YES && !value)
    ),
  income: string().test("isZero", (value, context) => {
    if (!!value && Number(value) === 0)
      return context.createError({ message: "Enter Valid Personal Income" });
    return true;
  }),
  fatherIncome: string().test("isZero", (value, context) => {
    if (!!value && Number(value) === 0)
      return context.createError({ message: "Enter Valid Father Income" });
    return true;
  }),
  motherIncome: string().test("isZero", (value, context) => {
    if (!!value && Number(value) === 0)
      return context.createError({ message: "Enter Valid Mother Income" });
    return true;
  }),
  spouseIncome: string().test("isZero", (value, context) => {
    if (!!value && Number(value) === 0)
      return context.createError({ message: "Enter Valid Spouse Income" });
    return true;
  }),
});
