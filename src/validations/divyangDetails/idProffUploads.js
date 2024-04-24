import { object, string } from "yup";
import {
  AADHAR_CARD_REGEX,
  DRIVING_LICENSE_REGEX,
  PAN_REGEX,
  RATION_CARD_REGEX,
  VOTERID_REGEX,
} from "../../constants/globalConstants";

export const validationSchema = object({
  voterId: string()
    .trim()
    .matches(VOTERID_REGEX, "Enter Valid Voter ID")
    .min(10, "Voter ID should be 10 characters")
    .test(
      "voterId",
      "Voter Id is required",
      (value, context) => !(context.parent?.voterIdPicture && !value)
    )
    .nullable(),
  voterIdPicture: string()
    .test(
      "voterIdPicture",
      "Voter Id is required",
      (value, context) => !(context.parent?.voterId && !value)
    )
    .nullable(),
  panCardNumber: string()
    .trim()
    .matches(PAN_REGEX, "Enter Valid Pan Card Number")
    .min(10, "Pan Card Number should be 10 characters")
    .test(
      "panCardNumber",
      "Pan is required",
      (value, context) => !(context.parent?.panCardPicture && !value)
    )
    .nullable(),
  panCardPicture: string()
    .test(
      "panCardPicture",
      "Pan is required",
      (value, context) => !(context.parent?.panCardNumber && !value)
    )
    .nullable(),
  drivingLicense: string()
    .trim()
    .matches(DRIVING_LICENSE_REGEX, "Enter Valid Driving License Number")
    .min(15, "Driving License Number should be 15 characters")
    .test(
      "drivingLicense",
      "Driving Lisence is required",
      (value, context) => !(context.parent?.drivingLicensePicture && !value)
    )
    .nullable(),
  drivingLicensePicture: string()
    .test(
      "drivingLicensePicture",
      "Driving Lisence is required",
      (value, context) => !(context.parent?.drivingLicense && !value)
    )
    .nullable(),
  rationCardNumber: string()
    .trim()
    .matches(RATION_CARD_REGEX, "Enter Valid Ration Card Number")
    .min(8, "Ration Card Number should be 8 characters")
    .test(
      "rationCardNumber",
      "Ration Card is required",
      (value, context) => !(context.parent?.rationCardPicture && !value)
    )
    .nullable(),
  rationCardPicture: string()
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
      (value, context) => !(context.parent?.aadharCardPicture && !value)
    )
    .nullable(),
  aadharCardPicture: string()
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
      (value, context) => !(context.parent?.pensionCardPicture && !value)
    )
    .nullable(),
  pensionCardPicture: string()
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
      (value, context) => !(context.parent?.medicalInsurancePicture && !value)
    )
    .nullable(),
  medicalInsurancePicture: string()
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
      (value, context) => !(context.parent?.disabilitySchemePicture && !value)
    )
    .nullable(),
  disabilitySchemePicture: string()
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
      (value, context) => !(context.parent?.BPL_OR_APL_Picture && !value)
    )
    .nullable(),
  BPL_OR_APL_Picture: string()
    .test(
      "BPL_OR_APL_Picture",
      "BPL or APL is required",
      (value, context) => !(context.parent?.BPL_OR_APL_Number && !value)
    )
    .nullable(),
});
