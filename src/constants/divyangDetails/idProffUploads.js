import { CODES } from "../globalConstants";

export const initialValues = {
  voterId: "",
  voterIdPicture: "",
  panCardNumber: "",
  panCardPicture: "",
  drivingLicense: "",
  drivingLicensePicture: "",
  rationCardNumber: "",
  rationCardPicture: "",
  aadharCardNumber: "",
  aadharCardPicture: "",
  pensionCardNumber: "",
  pensionCardPicture: "",
  medicalInsuranceNumber: "",
  medicalInsurancePicture: "",
  disabilitySchemeNumber: "",
  disabilitySchemePicture: "",
  BPL_OR_APL_Number: "",
  BPL_OR_APL_Picture: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const fields = {
  voterId: {
    label: "Voter ID No",
    name: "voterId",
    type: "alphaNumeric",
  },
  voterIdPicture: {
    label: "Upload Voter ID",
    name: "voterIdPicture",
  },
  panCardNumber: {
    label: "Pan Card No",
    name: "panCardNumber",
    type: "alphaNumeric",
  },
  panCardPicture: {
    label: "Upload Pan Card",
    name: "panCardPicture",
  },
  drivingLicense: {
    label: "Driving License No",
    name: "drivingLicense",
    type: "alphaNumeric",
  },
  drivingLicensePicture: {
    label: "Upload Driving License",
    name: "drivingLicensePicture",
  },
  rationCardNumber: {
    label: "Ration Card No",
    name: "rationCardNumber",
    type: "alphaNumeric",
  },
  rationCardPicture: {
    label: "Upload Ration Card",
    name: "rationCardPicture",
  },
  aadharCardNumber: {
    label: "Aadhar Card No",
    name: "aadharCardNumber",
    type: "mobile",
  },
  aadharCardPicture: {
    label: "Upload Aadhar Card",
    name: "aadharCardPicture",
  },
  pensionCardNumber: {
    label: "Pension Card No",
    name: "pensionCardNumber",
    type: "alphaNumeric",
  },
  pensionCardPicture: {
    label: "Upload Pension Card",
    name: "pensionCardPicture",
  },
  medicalInsuranceNumber: {
    label: "Medical Insurance Card No",
    name: "medicalInsuranceNumber",
    type: "alphaNumeric",
  },
  medicalInsurancePicture: {
    label: "Upload Medical Insurance Card",
    name: "medicalInsurancePicture",
  },
  disabilitySchemeNumber: {
    label: "Disability Scheme Card No",
    name: "disabilitySchemeNumber",
    type: "alphaNumeric",
  },
  disabilitySchemePicture: {
    label: "Upload Disability Scheme Card",
    name: "disabilitySchemePicture",
  },
  BPL_OR_APL_Number: {
    label: "BPL/APL Card No",
    name: "BPL_OR_APL_Number",
    type: "alphaNumeric",
  },
  BPL_OR_APL_Picture: {
    label: "Upload BPL/APL Card",
    name: "BPL_OR_APL_Picture",
  },
};
