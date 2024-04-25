import { CODES } from "../globalConstants";

export const initialValues = {
  disabilityType: "",
  disabilities: "",
  isDisabilitySinceBirth: CODES?.YES,
  disabilitySince: "",
  disabilityArea: "",
  disabilityPercentage: "",
  disabilityDueTo: "",
  certificateIssuingAuthority: "",
  disabilityCard: "",
  dateOfIssue: "",
  identityCardNumber: "",
  stateCode: "",
  districtCode: "",
  udidCardNumber: "",
  udidEnrollmentNumber: "",
  udidCardUrl: "",
};

export const fields = {
  disabilityType: {
    label: "Disability Type *",
    name: "disabilityType",
  },
  disabilities: {
    label: "Disability Sub Type *",
    name: "disabilities",
  },
  isDisabilitySinceBirth: {
    label: "Disability Since Birth",
    name: "isDisabilitySinceBirth",
  },
  disabilitySince: {
    label: "Disability Since *",
    name: "disabilitySince",
  },

  disabilityArea: {
    label: "Disability Area *",
    name: "disabilityArea",
  },
  disabilityPercentage: {
    label: "Disability Percentage *",
    name: "disabilityPercentage",
    type: "mobile",
  },
  disabilityDueTo: {
    label: "Disability Due To *",
    name: "disabilityDueTo",
  },
  certificateIssuingAuthority: {
    label: "Certificate Issuing Authority *",
    name: "certificateIssuingAuthority",
  },
  disabilityCard: {
    label: "Upload Disability Card",
    name: "disabilityCard",
  },
  dateOfIssue: {
    label: "Date of Issue *",
    name: "dateOfIssue",
  },
  stateCode: {
    label: "State Code *",
    name: "stateCode",
  },
  districtCode: {
    label: "District Code *",
    name: "districtCode",
  },
  identityCardNumber: {
    label: "Identity Card Number *",
    name: "identityCardNumber",
  },
  udidCardNumber: {
    label: "UDID Card Number *",
    name: "udidCardNumber",
    type: "alphaNumeric",
  },
  udidEnrollmentNumber: {
    label: "UDID Enrollment Number *",
    name: "udidEnrollmentNumber",
    type: "alphaNumeric",
  },
  udidCardUrl: {
    label: "Upload UDID Card",
    name: "udidCardUrl",
  },
};
