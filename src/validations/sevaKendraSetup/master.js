import { array, date, object, string } from "yup";
import { CODES, EMAIL_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  name: string()
    .trim()
    .min(3, "Seva Kendra Name must be at least 3 characters long")
    .required("Seva Kendra Name is required")
    .max(255, "Seva Kendra Name cannot have more than 255 characters"),
  stateId: string().required("State is required"),
  districtId: string().required("District is required"),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Address cannot have more than 255 characters"),
  landLineNumber: string()
    .trim()
    .required("Landline number is required")
    .length(10, "Landline number should be 10 digits")
    .test(
      "isNumeric",
      "Landline number should contain only numbers",
      (value) => !(value && !/^\d+$/.test(value))
    )
    .test(
      "isZero",
      "Invalid landline number",
      (value) => !(!!value && Number(value) === 0)
    ),
  mobileNumber: string()
    .trim()
    .required("Mobile number is required")
    .length(10, "Mobile number should be 10 digits")
    .test(
      "isNumeric",
      "Mobile number should contain only numbers",
      (value) => !(value && !/^\d+$/.test(value))
    )
    .test(
      "isZero",
      "Invalid mobile number",
      (value) => !(!!value && Number(value) === 0)
    ),
  startDate: date()
    .typeError("Invalid date")
    .required("Seva Kendra Start Date is required"),
  contactPerson: object({
    name: string()
      .trim()
      .min(3, "Contact Person Name must be at least 3 characters long")
      .required("Contact Person Name is required")
      .max(255, "Contact Person Name cannot have more than 255 characters"),
    email: string()
      .trim()
      .matches(EMAIL_REGEX, "Enter Valid Email")
      .max(255, "Email cannot have more than 255 characters")
      .nullable(),
    phoneNumber1: string()
      .trim()
      .required("Primary Number is required")
      .length(10, "Primary Number should be 10 digits")
      .test(
        "isNumeric",
        "Primary Number should contain only numbers",
        (value) => !(value && !/^\d+$/.test(value))
      )
      .test(
        "isZero",
        "Invalid primary number",
        (value) => !(!!value && Number(value) === 0)
      ),
    phoneNumber2: string()
      .trim()
      .length(10, "Secondary Number should be 10 digits")
      .test(
        "isNumeric",
        "Secondary Number should contain only numbers",
        (value) => !(value && !/^\d+$/.test(value))
      )
      .test(
        "isZero",
        "Invalid secondary number",
        (value) => !(!!value && Number(value) === 0)
      )
      .test(
        "isSame",
        "Secondary Number should not same as the Primary Number",
        (value, context) => !(value === context.parent?.phoneNumber1 && !!value)
      )
      .nullable(),
  }),
  servicesBySevaKendra: array()
    .required()
    .test("isLength", "Services is required", (value) => value?.length !== 0)
    .min(1, "Minimum one Service is required"),
  status: string().nullable(),
  description: string()
    .trim()
    .nullable()
    .test(
      "deactivationReason",
      "Deactivation reason is required",
      (value, context) => !(context.parent?.status !== CODES?.ACTIVE && !value)
    )
    .max(255, "Deactivation reason cannot have more than 255 characters"),
});
