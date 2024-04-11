export const initialValues = {
  name: "",
  stateId: "",
  districtId: "",
  address: "",
  landLineNumber: "",
  mobileNumber: "",
  startDate: "",
  contactPersonId: "",
  emailId: "",
  phoneNumber1: "",
  phoneNumber2: "",
  serviceTypes: [],
  statusId: "",
  effectiveDate: "",
  reason: "",
};

export const fields = {
  name: {
    label: "Seva Kendra Name *",
    name: "name",
    type: "alphaNumeric",
  },
  stateId: {
    label: "State *",
    name: "stateId",
  },
  districtId: {
    label: "District *",
    name: "districtId",
  },
  address: {
    label: "Address *",
    name: "address",
    type: "alphaNumeric",
  },
  landLineNumber: {
    label: "Landline Number *",
    name: "landLineNumber",
    type: "mobile",
  },
  mobileNumber: {
    label: "Mobile No *",
    name: "mobileNumber",
    type: "mobile",
  },
  startDate: {
    label: "Seva Kendra Start Date *",
    name: "startDate",
  },
  contactPersonId: {
    label: "Contact Person Name *",
    name: "contactPersonId",
    type: "alphabets",
  },
  emailId: {
    label: "Email Id *",
    name: "emailId",
    type: "email",
  },
  phoneNumber1: {
    label: "Phone No 1 *",
    name: "phoneNumber1",
    type: "mobile",
  },
  phoneNumber2: {
    label: "Phone No 2 *",
    name: "phoneNumber2",
    type: "mobile",
  },
  serviceTypes: {
    label: "Service Types *",
    name: "serviceTypes",
  },
};
