import { array, date, object, string } from "yup";
import { CODES, EMAIL_REGEX } from "../../constants/globalConstants";

export const validationSchema = (editId) =>
  object({
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
      .required("LandLine number is required")
      .test(
        "isNumeric",
        "LandLine number should contain only numbers",
        (value) => {
          if (value && !/^\d+$/.test(value)) {
            return false;
          }
          return true;
        }
      )
      .length(10, "Mobile number should be 10 digits")
      .test("isZero", (value, context) => {
        if (!!value && Number(value) === 0)
          return context.createError({ message: "Invalid mobile number" });
        return true;
      }),
    mobileNumber: string()
      .trim()
      .required("Mobile number is required")
      .test(
        "isNumeric",
        "Mobile number should contain only numbers",
        (value) => {
          if (value && !/^\d+$/.test(value)) {
            return false;
          }
          return true;
        }
      )
      .length(10, "Mobile number should be 10 digits")
      .test("isZero", (value, context) => {
        if (!!value && Number(value) === 0)
          return context.createError({ message: "Invalid mobile number" });
        return true;
      }),
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
        .required("Email Id is required")
        .matches(EMAIL_REGEX, "Enter Valid Email")
        .max(255, "Email cannot have more than 255 characters"),
      phoneNumber1: string()
        .trim()
        .required("Primary Number is required")
        .test(
          "isNumeric",
          "Primary Number should contain only numbers",
          (value) => {
            if (value && !/^\d+$/.test(value)) {
              return false;
            }
            return true;
          }
        )
        .length(10, "Primary Number should be 10 digits")
        .test("isZero", (value, context) => {
          if (!!value && Number(value) === 0)
            return context.createError({ message: "Invalid mobile number" });
          return true;
        }),
      phoneNumber2: string()
        .trim()
        .required("Secondary Number is required")
        .test(
          "isNumeric",
          "Secondary Number should contain only numbers",
          (value) => {
            if (value && !/^\d+$/.test(value)) {
              return false;
            }
            return true;
          }
        )
        .length(10, "Secondary Number should be 10 digits")
        .test("isZero", (value, context) => {
          if (!!value && Number(value) === 0)
            return context.createError({ message: "Invalid mobile number" });
          if (value === context.parent?.phoneNumber1 && !!value)
            return context.createError({
              message: "Secondary Number should not same as the Primary Number",
            });
          return true;
        })
        .nullable(),
    }),
    servicesBySevaKendra: array()
      .required("Services is required")
      .min(1, "Minimum one Service is required"),
    status: string().nullable(),
    description: string()
      .trim()
      .nullable()
      .test(
        "deactivationReason",
        "Deactivation reason is required",
        (value, context) =>
          !(context.parent?.status !== CODES.ACTIVE && !!editId && !value)
      )
      .max(255, "Deactivation reason cannot have more than 255 characters"),
  });
