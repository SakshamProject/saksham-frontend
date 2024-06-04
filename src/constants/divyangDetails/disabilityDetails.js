import { CODES } from "../globalConstants";

export const initialValues = {
  disabilities: [],
  identityCardNumber: "",
  stateCode: "",
  districtCode: "",
  udidCardNumber: "",
  udidEnrollmentNumber: "",
  udidCardUrl: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const multiPartInitialState = {
  disabilityTypeId: "",
  disabilitySubTypeId: "",
  isDisabilitySinceBirth: CODES?.YES,
  disabilitySince: "",
  disabilityArea: "",
  disabilityPercentage: "",
  disabilityDueTo: "",
  certificateIssueAuthority: "",
  disabilityCard: "",
  dateOfIssue: "",
};

export const fields = {
  disabilityType: {
    label: "Disability Type *",
    name: "disabilityTypeId",
  },
  disabilities: {
    label: "Disability Sub Type *",
    name: "disabilitySubTypeId",
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
    name: "certificateIssueAuthority",
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

export const rawData = [];
