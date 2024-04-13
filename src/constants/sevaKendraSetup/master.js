export const initialValues = {
  name: "",
  stateId: "",
  districtId: "",
  address: "",
  landLineNumber: "",
  mobileNumber: "",
  startDate: "",
  contactPerson: {
    name: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
  },
  servicesBySevaKendra: [],
  auditLog: {
    status: "ACTIVE",
    date: "",
    description: "",
  },
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
  contactPerson: {
    name: {
      label: "Contact Person Name *",
      name: "contactPerson.name",
      type: "alphabets",
    },
    email: {
      label: "Email Id *",
      name: "contactPerson.email",
      type: "email",
    },
    phoneNumber1: {
      label: "Phone No 1 *",
      name: "contactPerson.phoneNumber1",
      type: "mobile",
    },
    phoneNumber2: {
      label: "Phone No 2 *",
      name: "contactPerson.phoneNumber2",
      type: "mobile",
    },
  },
  servicesBySevaKendra: {
    label: "Service Types *",
    name: "servicesBySevaKendra",
  },
};
