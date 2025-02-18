import { CODES } from "../globalConstants";
import { genderSeed } from "../seeds";

export const initialValues = {
  firstName: "",
  lastName: "",
  divyangId: "",
  profilePhoto: "",
  gender: CODES?.MALE,
  dateOfBirth: "",
  mailId: "",
  mobileNumber: "",
  userName: "",
  password: "",
  confirmPassword: "",
  aadharCardNumber: "",
  UDIDCardNumber: "",
};

export const fields = {
  firstName: {
    label: "Divyang First Name *",
    name: "firstName",
    fieldType: "alphabets",
  },
  lastName: {
    label: "Divyang Last Name *",
    name: "lastName",
    fieldType: "alphabets",
  },
  divyangId: {
    label: "Divyang ID *",
    name: "divyangId",
  },
  profilePhoto: {
    label: "Upload picture",
    name: "profilePhoto",
    type: "image",
    accept: "image/*",
  },
  gender: {
    label: "Gender",
    name: "gender",
    isHelperText: false,
    inputValues: genderSeed(),
  },
  dateOfBirth: {
    label: "Date of Birth *",
    name: "dateOfBirth",
    maxDate: new Date(),
  },
  mailId: {
    label: "Mail ID *",
    name: "mailId",
    fieldType: "email",
  },
  mobileNumber: {
    label: "Mobile Number *",
    name: "mobileNumber",
    type: "number",
    maxLength: 10,
  },
  aadharCardNumber: {
    label: "Aadhar Number *",
    name: "aadharCardNumber",
    type: "number",
    maxLength: 12,
  },
  UDIDCardNumber: {
    label: "UDID Number *",
    name: "UDIDCardNumber",
  },
  userName: {
    label: "Login User Name *",
    name: "userName",
  },
  password: {
    label: "Password *",
    name: "password",
  },
  confirmPassword: {
    label: "Confirm Password *",
    name: "confirmPassword",
  },
};
