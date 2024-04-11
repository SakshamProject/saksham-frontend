export const initialValues = {
  name: "",
  stateId: "",
  districtId: "",
  address: "",
  landlineNumber: "",
  mobileNo: "",
  startDate: "",
  contactPersonName: "",
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
  landlineNumber: {
    label: "Landline Number *",
    name: "landlineNumber",
    type: "mobile",
  },
  mobileNo: {
    label: "Mobile No *",
    name: "mobileNo",
    type: "mobile",
  },
  startDate: {
    label: "Seva Kendra Start Date *",
    name: "startDate",
  },
  contactPersonName: {
    label: "Contact Person Name *",
    name: "contactPersonName",
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
