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
  stateId: string().required("State is required"),
  districtId: string().required("District is required"),
  sevaKendraId: string().required("Seva Kendra is required"),
  userId: string().required("Assign user is required"),

  serviceTypeId: string().required("Service type is required"),
  serviceId: string().required("Service sub type is required"),
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

  // nonSevaKendraFollowUp: object({
  //   name: "",
  //   mobileNumber: "",
  //   email: "",
  //   sendMail: "NO",
  // }),
});
