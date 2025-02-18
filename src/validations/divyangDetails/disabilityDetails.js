import { date, object, string } from "yup";
import { CODES, PERCENTAGE_REGEX } from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = object({
  stateCode: string()
    .trim()
    .max(255, "State Code cannot have more than 255 characters")
    .required("State Code is required"),
  districtCode: string()
    .trim()
    .max(255, "District Code cannot have more than 255 characters")
    .required("District Code is required"),
  identityCardNumber: string()
    .trim()
    .max(255, "Identity Card Number cannot have more than 255 characters")
    .required("Identity Card Number is required"),
  UDIDCardNumber: string()
    .trim()
    .test(
      "UDIDCardNumber",
      "UDID Card number is required",
      (value, context) => !!context.parent?.UDIDEnrollmentNumber || value
    )
    .nullable(),
  UDIDEnrollmentNumber: string()
    .trim()
    .test(
      "UDIDEnrollmentNumber",
      "UDID Enrollment Number is required",
      (value, context) => !!context.parent?.UDIDCardNumber || value
    )
    .nullable(),
  UDIDCardFile: string().required("UDID Card Authority is required"),
});

export const multiValidationSchema = object({
  disabilityTypeId: string().required("Disability Type is required"),
  isDisabilitySinceBirth: string().nullable(),
  disabilitySince: date()
    .typeError("Invalid date")
    .min(
      minMaxAge({})?.max,
      "Disability Since should be less than 100 years old"
    )
    .max(new Date(), "Disability Since should be in Past")
    .test(
      "disabilitySince",
      "Disability Since is required",
      (value, context) =>
        !(context.parent?.isDisabilitySinceBirth !== CODES?.YES && !value)
    )
    .nullable(),
  disabilityArea: string()
    .trim()
    .max(255, "Disability Area cannot have more than 255 characters")
    .required("Disability Area is required"),
  disabilityPercentage: string()
    .trim()
    .required("Disability Percentage is required")
    .matches(PERCENTAGE_REGEX, "Enter Valid Disability Percentage")
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0) {
        context.createError({
          message: "Enter Valid Disability Percentage",
        });
        return false;
      }
      return true;
    }),
  disabilityDueTo: string()
    .trim()
    .max(255, "Disability Reason cannot have more than 255 characters")
    .required("Disability Reason is required"),
  certificateIssueAuthority: string().required(
    "Certificate Issuing Authority is required"
  ),
  disabilityCards: string()
    .required("Disability Card Authority is required")
    .nullable(),
  dateOfIssue: date()
    .typeError("Invalid date")
    .min(minMaxAge({})?.max, "Date Of Issue should be less than 100 years old")
    .max(new Date(), "Date Of Issue should be in Past")
    .required("Date Of Issue is required"),
});
