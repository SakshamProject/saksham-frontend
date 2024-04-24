import { CODES } from "../globalConstants";

export const initialValues = {
  firstName: "",
  lastName: "",
  divyangId: "",
  picture: "",
  gender: "male",
  bloodGroup: "",
  dateOfBirth: "",
  age: "",
  mailId: "",
  mobileNumber: "",
  fatherName: "",
  motherName: "",
  isMarried: CODES?.NO,
  spouseName: "",
  spouseNumber: "",
  qualification: "",
  eductionQualification: "",
  religion: "",
  communityCategoryId: "",
  community: "",
  extraCurricularActivity: "",
  password: "",
  confirmPassword: "",
};

export const fields = {
  firstName: {
    label: "Divyang First Name *",
    name: "firstName",
    type: "alphabets",
  },
  lastName: {
    label: "Divyang Last Name *",
    name: "lastName",
  },
  divyangId: {
    label: "Divyang ID *",
    name: "divyangId",
  },
  picture: {
    label: "Upload picture",
    name: "picture",
  },
  gender: {
    label: "Gender",
    name: "gender",
  },
  bloodGroup: {
    label: "Blood Group *",
    name: "bloodGroup",
  },
  dateOfBirth: {
    label: "Date of Birth *",
    name: "dateOfBirth",
  },
  age: {
    label: "Age",
    name: "age",
  },
  mailId: {
    label: "Mail ID *",
    name: "mailId",
    type: "email",
  },
  mobileNumber: {
    label: "Mobile Number *",
    name: "mobileNumber",
    type: "mobile",
  },
  fatherName: {
    label: "Father Name *",
    name: "fatherName",
    type: "alphabets",
  },
  motherName: {
    label: "Mother Name *",
    name: "motherName",
    type: "alphabets",
  },
  isMarried: {
    label: "Married",
    name: "isMarried",
  },
  spouseName: {
    label: "Spouse Name",
    name: "spouseName",
    type: "alphabets",
  },
  spouseNumber: {
    label: "Spouse Mobile No",
    name: "spouseNumber",
    type: "mobile",
  },
  qualification: {
    label: "Select Educational Qualification",
    name: "qualification",
  },
  eductionQualification: {
    label: "Select Educational Qualification Sub Type *",
    name: "eductionQualification",
  },
  religion: {
    label: "Religion *",
    name: "religion",
    type: "alphabets",
  },
  communityCategoryId: {
    label: "Community Category *",
    name: "communityCategoryId",
  },
  community: {
    label: "Community *",
    name: "community",
    type: "alphabets",
  },
  extraCurricularActivity: {
    label: "Extra Curricular Activity, If any",
    name: "extraCurricularActivity",
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
