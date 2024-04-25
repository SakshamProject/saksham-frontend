import { date, object } from "yup";

export const listValidationSchema = object({
  startDate: date()
    .typeError("Invalid date")
    .test(
      "isStart",
      "Start date is required",
      (value, context) => !(!value && !!context?.parent?.endDate)
    )
    .test(
      "isMax",
      "Start date is not greater than today",
      (value) => new Date() > value
    )
    .test(
      "isEqual",
      "Start date is not greater than or equal to end date",
      (value, context) => !!value && value < context?.parent?.endDate
    ),
  endDate: date()
    .typeError("Invalid date")
    .test(
      "isMax",
      "End date is not greater than today",
      (value) => new Date() > value
    )
    .test(
      "isEnd",
      "End date is required",
      (value, context) => !(!value && !!context?.parent?.startDate)
    ),
});

export const validationSchema = object({});
