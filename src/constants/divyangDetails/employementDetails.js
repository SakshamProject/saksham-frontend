import { CODES } from "../globalConstants";

export const initialValues = {
  isEmployed: CODES?.YES,
  unemployedSince: "",
  occupation: "",
  income: "",
  fatherOccupation: "",
  fatherIncome: "",
  motherOccupation: "",
  motherIncome: "",
  spouseOccupation: "",
  spouseIncome: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const fields = {
  isEmployed: {
    label: "Employed",
    name: "isEmployed",
  },
  unemployedSince: {
    label: "If not Since",
    name: "unemployedSince",
  },
  occupation: {
    label: "Applicant Occupation",
    name: "occupation",
  },
  income: {
    label: "Personal Income",
    name: "income",
    type: "mobile",
  },
  fatherOccupation: {
    label: "Father's Occupation",
    name: "fatherOccupation",
  },
  fatherIncome: {
    label: "Father's Income",
    name: "fatherIncome",
    type: "mobile",
  },
  motherOccupation: {
    label: "Mother's Occupation",
    name: "motherOccupation",
  },
  motherIncome: {
    label: "Mother's Income",
    name: "motherIncome",
    type: "mobile",
  },
  spouseOccupation: {
    label: "Spouse's Occupation",
    name: "spouseOccupation",
  },
  spouseIncome: {
    label: "Spouse's Income",
    name: "spouseIncome",
    type: "mobile",
  },
};
