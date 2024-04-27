import { date, object, string } from "yup";
import { formatDate } from "../../utils/common";

export const listValidationSchema = object({
  startDate: date()
    .typeError("Invalid date")
    .test("isStart", "Start date is required", (value) => !!value)
    .test("isMax", "Start date is not greater than today", (value) => {
      if (!value) return true;
      return new Date() > value;
    })
    .test(
      "isEqual",
      "Start date is not greater than or equal to end date",
      (value, context) =>
        !!value &&
        !!context?.parent?.endDate &&
        value < context?.parent?.endDate
    ),
  endDate: date()
    .typeError("Invalid date")
    .test("isEnd", "End date is required", (value) => !!value)
    .test("isMax", "End date is not greater than today", (value) => {
      if (!value) return true;
      return new Date() > value;
    }),
});

export const validationSchema = object({
  serviceTypeId: string().required("Service type is required"),
  serviceId: string().required("Service is required"),
  dateOfService: date()
    .typeError("Invalid Date")
    .required("Date of service is required")
    .test(
      "isPast",
      "Date of service is not less than today",
      (value) => !!value && value > new Date()
    ),
  dueDate: date()
    .typeError("Invalid Date")
    .required("Due date of service is required")
    .test("isPast", "Due date is not less than today", (value) => {
      return (
        !!value &&
        formatDate({ date: value, format: "iso" }) >
          formatDate({ date: new Date(), format: "iso" })
      );
    }),

  stateId: string().test(
    "isRequired",
    "State is required",
    (value, context) =>
      !value && context?.parent?.isNonSevaKendraFollowUpRequired !== "NO"
  ),
  districtId: string().test(
    "isRequired",
    "District is required",
    (value, context) =>
      !value && context?.parent?.isNonSevaKendraFollowUpRequired !== "NO"
  ),
  sevaKendraId: string().test(
    "isRequired",
    "Seva Kendra is required",
    (value, context) =>
      !value && context?.parent?.isNonSevaKendraFollowUpRequired !== "NO"
  ),
  userId: string().test(
    "isRequired",
    "Assign user is required",
    (value, context) =>
      !value && context?.parent?.isNonSevaKendraFollowUpRequired !== "NO"
  ),

  nonSevaKendraFollowUp: object({
    name: string()
      .trim()
      .test(
        "isRequired",
        "Contact person name is required",
        (value, context) => {
          console.log(value, context?.from);
        }
      ),
    // mobileNumber: "",
    // email: "",
    // sendMail: "NO",
  }),
});
