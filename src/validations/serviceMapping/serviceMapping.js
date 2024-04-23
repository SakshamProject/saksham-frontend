import { object, string } from "yup";

export const listValidationSchema = object({
  startDate: string().test(
    "isStart",
    "Start date is required",
    (value, context) => !(!value && !!context?.parent?.endDate)
  ),
  endDate: string().test(
    "isEnd",
    "End date is required",
    (value, context) => !(!value && !!context?.parent?.startDate)
  ),
});

export const validationSchema = object({});
