import { date, object, string } from "yup";
import { minMaxAge } from "../../utils/common";
import { CODES, PERCENTAGE_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  disabilityType: string().required("Disability Type is required"),
  disabilities: string().required("Disability Sub Type is required"),
  isDisabilitySinceBirth: string().nullable(),
  disabilitySince: date()
    .typeError("Invalid date")
    .min(minMaxAge().max, "Disability Since should be less than 100 years old")
    .max(new Date(), "Disability Since should be in Past")
    .test(
      "disabilitySince",
      "Disability Since is required",
      (value, context) =>
        !(context.parent?.isDisabilitySinceBirth !== CODES?.YES && !value)
    ),
  disabilityArea: string()
    .trim()
    .min(3, "Disability Area must be at least 3 characters long")
    .max(255, "Disability Area cannot have more than 255 characters")
    .required("Disability Area is required"),
  disabilityPercentage: string()
    .trim()
    .required("Disability Percentage is required")
    .matches(PERCENTAGE_REGEX, "Enter Valid Disability Percentage")
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0)
        return context.createError({
          message: "Enter Valid Disability Percentage",
        });
      return true;
    }),
  disabilityDueTo: string()
    .trim()
    .min(3, "Disability Reason must be at least 3 characters long")
    .max(255, "Disability Reason cannot have more than 255 characters")
    .required("Disability Reason is required"),
  certificateIssuingAuthority: string().required(
    "Certificate Issuing Authority is required"
  ),
  disabilityCard: string().required("Disability Card Authority is required"),
  dateOfIssue: date()
    .typeError("Invalid date")
    .min(minMaxAge().max, "Date Of Issue should be less than 100 years old")
    .max(new Date(), "Date Of Issue should be in Past")
    .required("Date Of Issue is required"),
  stateCode: string()
    .trim()
    .min(3, "State Code must be at least 3 characters long")
    .max(255, "State Code cannot have more than 255 characters")
    .required("State Code is required"),
  districtCode: string()
    .trim()
    .min(3, "District Code must be at least 3 characters long")
    .max(255, "District Code cannot have more than 255 characters")
    .required("District Code is required"),
  identityCardNumber: string()
    .trim()
    .min(3, "Identity Card Number must be at least 3 characters long")
    .max(255, "Identity Card Number cannot have more than 255 characters")
    .required("Identity Card Number is required"),
  udidCardNumber: string()
    .trim()
    .test(
      "udidCardNumber",
      "UDID Card number is required",
      (value, context) => !!context.parent?.udidEnrollmentNumber || value
    )
    .nullable(),
  udidEnrollmentNumber: string()
    .trim()
    .test(
      "udidEnrollmentNumber",
      "UDID Enrollment Number is required",
      (value, context) => !!context.parent?.udidCardNumber || value
    )
    .nullable(),
  udidCardUrl: string().required("UDID Card Authority is required"),
});
