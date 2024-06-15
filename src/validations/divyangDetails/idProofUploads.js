import { object, string } from "yup";
import {
  AADHAR_CARD_REGEX,
  DRIVING_LICENSE_REGEX,
  PAN_REGEX,
  RATION_CARD_REGEX,
  VOTERID_REGEX,
} from "../../constants/globalConstants";

export const validationSchema = object({
  voterIdNumber: string()
    .trim()
    .matches(VOTERID_REGEX, "Enter Valid Voter ID")
    .min(10, "Voter ID should be 10 characters")
    .test(
      "voterId",
      "Voter Id is required",
      (value, context) => !(context.parent?.voterId && !value)
    )
    .nullable(),
  voterId: string()
    .test(
      "voterIdPicture",
      "Voter Id file is required",
      (value, context) => !(context.parent?.voterIdNumber && !value)
    )
    .nullable(),
  panCardNumber: string()
    .trim()
    .matches(PAN_REGEX, "Enter Valid Pan Card Number")
    .min(10, "Pan Card Number should be 10 characters")
    .test(
      "panCardNumber",
      "Pan Card is required",
      (value, context) => !(context.parent?.panCard && !value)
    )
    .nullable(),
  panCard: string()
    .test("panCardPicture", "Pan is required", (value, context) => {
      return !(context.parent?.panCardNumber && !value);
    })
    .nullable(),
  drivingLicenseNumber: string()
    .trim()
    .matches(DRIVING_LICENSE_REGEX, "Enter Valid Driving License Number")
    .min(15, "Driving License Number should be 15 characters")
    .test(
      "drivingLicense",
      "Driving License is required",
      (value, context) => !(context.parent?.drivingLicense && !value)
    )
    .nullable(),
  drivingLicense: string()
    .test(
      "drivingLicensePicture",
      "Driving License is required",
      (value, context) => !(context.parent?.drivingLicenseNumber && !value)
    )
    .nullable(),
  rationCardNumber: string()
    .trim()
    .matches(RATION_CARD_REGEX, "Enter Valid Ration Card Number")
    .min(8, "Ration Card Number should be 8 characters")
    .test(
      "rationCardNumber",
      "Ration Card is required",
      (value, context) => !(context.parent?.rationCard && !value)
    )
    .nullable(),
  rationCard: string()
    .test(
      "rationCardPicture",
      "Ration Card is required",
      (value, context) => !(context.parent?.rationCardNumber && !value)
    )
    .nullable(),
  aadharCardNumber: string()
    .trim()
    .matches(AADHAR_CARD_REGEX, "Enter Valid Aadhar Card Number")
    .min(12, "Aadhar Card Number should be 8 characters")
    .test(
      "aadharCardNumber",
      "Aadhar Card is required",
      (value, context) => !(context.parent?.aadharCard && !value)
    )
    .nullable(),
  aadharCard: string()
    .test(
      "aadharCardPicture",
      "Aadhar Card is required",
      (value, context) => !(context.parent?.aadharCardNumber && !value)
    )
    .nullable(),
  pensionCardNumber: string()
    .trim()
    .min(6, "Enter Valid Pension Card Number")
    .test(
      "pensionCardNumber",
      "Pension Card is required",
      (value, context) => !(context.parent?.pensionCard && !value)
    )
    .nullable(),
  pensionCard: string()
    .test(
      "pensionCardPicture",
      "Pension Card is required",
      (value, context) => !(context.parent?.pensionCardNumber && !value)
    )
    .nullable(),
  medicalInsuranceNumber: string()
    .trim()
    .min(6, "Enter Valid Medical Insurance Number")
    .test(
      "medicalInsuranceNumber",
      "Medical Insurance is required",
      (value, context) => !(context.parent?.medicalInsuranceCard && !value)
    )
    .nullable(),
  medicalInsuranceCard: string()
    .test(
      "medicalInsurancePicture",
      "Medical Insurance is required",
      (value, context) => !(context.parent?.medicalInsuranceNumber && !value)
    )
    .nullable(),
  disabilitySchemeNumber: string()
    .trim()
    .min(6, "Enter Valid Disability Scheme Number")
    .test(
      "disabilitySchemeNumber",
      "Disability Scheme is required",
      (value, context) => !(context.parent?.disabilitySchemeCard && !value)
    )
    .nullable(),
  disabilitySchemeCard: string()
    .test(
      "disabilitySchemePicture",
      "Disability Scheme is required",
      (value, context) => !(context.parent?.disabilitySchemeNumber && !value)
    )
    .nullable(),
  BPL_OR_APL_Number: string()
    .trim()
    .min(6, "Enter Valid BPL or APL Number")
    .test(
      "BPL_OR_APL_Number",
      "BPL or APL is required",
      (value, context) => !(context.parent?.BPL_OR_APL_Card && !value)
    )
    .nullable(),
  BPL_OR_APL_Card: string()
    .test(
      "BPL_OR_APL_Picture",
      "BPL or APL is required",
      (value, context) => !(context.parent?.BPL_OR_APL_Number && !value)
    )
    .nullable(),
});
