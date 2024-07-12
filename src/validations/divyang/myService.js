import { date, object, string } from "yup";
import { formatDate } from "../../utils/common";

export const validationSchema = object({
  sevaKendraId: string().required("Seva Kendra is required"),
  serviceTypeId: string().required("Service type is required"),
  serviceId: string().required("Service is required"),
  dateOfService: date()
    .typeError("Invalid Date")
    .required("Date of service is required")
    .test(
      "isPast",
      "Date of service is not less than today",
      (value) => !!value && value >= new Date().setHours(0, 0, 0, 0)
    ),
  dueDate: date()
    .typeError("Invalid Date")
    .required("Due date of service is required")
    .test(
      "isPast",
      "Due date is not less than today",
      (value) =>
        !!value &&
        formatDate({ date: value, format: "iso" }) >
          formatDate({ date: new Date(), format: "iso" })
    )
    .test(
      "isLess",
      "Due date is not less than Date of Service",
      (value, context) => context?.parent?.dateOfService < value
    ),
});
