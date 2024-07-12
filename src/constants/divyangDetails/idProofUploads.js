import { CODES } from "../globalConstants";

export const initialValues = {
  voterIdNumber: "",
  voterId: "",
  panCardNumber: "",
  panCard: "",
  drivingLicenseNumber: "",
  drivingLicense: "",
  rationCardNumber: "",
  rationCard: "",
  aadharCardNumber: "",
  aadharCard: "",
  pensionCardNumber: "",
  pensionCard: "",
  medicalInsuranceNumber: "",
  medicalInsuranceCard: "",
  disabilitySchemeNumber: "",
  disabilitySchemeCard: "",
  BPL_OR_APL_Number: "",
  bplOrAplCardFileName: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
  bplOrAplCard: "",
};

export const IdNumberKeys = [
  "voterIdNumber",
  "panCardNumber",
  "drivingLicenseNumber",
  "rationCardNumber",
  "aadharCardNumber",
  "pensionCardNumber",
  "medicalInsuranceNumber",
  "disabilitySchemeNumber",
  "BPL_OR_APL_Number",
];

export const fields = {
  voterIdNumber: {
    label: "Voter ID No",
    name: "voterIdNumber",
    fieldType: "alphaNumeric",
  },
  voterId: {
    label: "Upload Voter ID",
    name: "voterId",
  },
  panCardNumber: {
    label: "Pan Card No",
    name: "panCardNumber",
    fieldType: "alphaNumeric",
  },
  panCard: {
    label: "Upload Pan Card",
    name: "panCard",
  },
  drivingLicenseNumber: {
    label: "Driving License No",
    name: "drivingLicenseNumber",
    fieldType: "alphaNumeric",
  },
  drivingLicense: {
    label: "Upload Driving License",
    name: "drivingLicense",
  },
  rationCardNumber: {
    label: "Ration Card No",
    name: "rationCardNumber",
    fieldType: "alphaNumeric",
  },
  rationCard: {
    label: "Upload Ration Card",
    name: "rationCard",
  },
  aadharCardNumber: {
    label: "Aadhar Card No",
    name: "aadharCardNumber",
    type: "number",
  },
  aadharCard: {
    label: "Upload Aadhar Card",
    name: "aadharCard",
  },
  pensionCardNumber: {
    label: "Pension Card No",
    name: "pensionCardNumber",
    fieldType: "alphaNumeric",
  },
  pensionCard: {
    label: "Upload Pension Card",
    name: "pensionCard",
  },
  medicalInsuranceNumber: {
    label: "Medical Insurance Card No",
    name: "medicalInsuranceNumber",
    fieldType: "alphaNumeric",
  },
  medicalInsuranceCard: {
    label: "Upload Medical Insurance Card",
    name: "medicalInsuranceCard",
  },
  disabilitySchemeNumber: {
    label: "Disability Scheme Card No",
    name: "disabilitySchemeNumber",
    fieldType: "alphaNumeric",
  },
  disabilitySchemeCard: {
    label: "Upload Disability Scheme Card",
    name: "disabilitySchemeCard",
  },
  BPL_OR_APL_Number: {
    label: "BPL/APL Card No",
    name: "BPL_OR_APL_Number",
    fieldType: "alphaNumeric",
  },
  bplOrAplCard: {
    label: "Upload BPL/APL Card",
    name: "bplOrAplCard",
  },
};

export const fileNameKeys = {
  voterIdFileName: null,
  panCardFileName: null,
  drivingLicenseFileName: null,
  rationCardFileName: null,
  aadharCardFileName: null,
  pensionCardFileName: null,
  medicalInsuranceCardFileName: null,
  disabilitySchemeCardFileName: null,
  bplOrAplCardFileName: null,
};
