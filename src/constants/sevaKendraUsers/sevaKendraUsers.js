export const initialValues = {
  stateId: "",
  districtId: "",
  sevaKendraId: "",
  userId: "",
  picture: "",
  firstName: "",
  lastName: "",
  genderId: "male",
  dateOfBirth: "",
  designationId: "",
  personalMailId: "",
  personalContactNumber: "",
  whatsAppNumber: "",
  loginId: "",
  password: "",
  confirmPassword: "",
};

export const fields = {
  stateId: {
    label: "Select Seva Kendra State *",
    name: "stateId",
  },
  districtId: {
    label: "Select Seva Kendra District *",
    name: "districtId",
  },
  sevaKendraId: {
    label: "Select Seva Kendra *",
    name: "sevaKendraId",
  },
  userId: {
    label: "User ID *",
    name: "userId",
  },
  picture: {
    label: "Upload picture",
    name: "picture",
  },
  firstName: {
    label: "First Name *",
    name: "firstName",
    type: "alphabets",
  },
  lastName: {
    label: "Last Name *",
    name: "lastName",
    type: "alphabets",
  },
  genderId: {
    label: "Gender",
    name: "genderId",
  },
  dateOfBirth: {
    label: "Date of Birth *",
    name: "dateOfBirth",
  },
  designationId: {
    label: "Select Designation *",
    name: "designationId",
  },
  personalMailId: {
    label: "Personal Mail Id *",
    name: "personalMailId",
    type: "email",
  },
  personalContactNumber: {
    label: "Personal Contact No *",
    name: "personalContactNumber",
    type: "mobile",
  },
  whatsAppNumber: {
    label: "WhatsApp Number *",
    name: "whatsAppNumber",
    type: "mobile",
  },
  loginId: {
    label: "Login Id *",
    name: "loginId",
    type: "mobile",
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

export const genderSeeds = [
  {
    name: "Male",
    id: "male",
    code: "male",
  },
  {
    name: "Female",
    id: "female",
    code: "female",
  },
];
