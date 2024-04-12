export const initialValues = {
  sevaKendraStateId: "",
  sevaKendraDistrictId: "",
  sevaKendraName: "",
  designationName: "",
  accessMenus: [],
};

export const fields = {
  stateId: {
    label: "Seva Kendra State *",
    name: "stateId",
  },
  districtId: {
    label: "Seva Kendra District *",
    name: "districtId",
  },
  name: {
    label: "Seva Kendra Name *",
    name: "name",
    type: "alphaNumeric",
  },
};
