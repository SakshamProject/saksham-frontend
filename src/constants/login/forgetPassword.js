export const initialValues = {
  userName: "",
  UDIDCardNumber: "",
  contactNumber: "",
};

export const fields = {
  userName: {
    label: "User Name",
    name: "userName",
  },
  contactNumber: {
    label: "Contact Number",
    name: "contactNumber",
    type: "number",
    maxLength: 10,
  },
  UDIDCardNumber: {
    label: "UDID Number",
    name: "UDIDCardNumber",
  },
};
