import { CODES } from "../globalConstants";

export const initialValues = {
  doorNumber: "",
  flatNumber: "",
  streetName: "",
  nagarName: "",
  stateId: "",
  districtId: "",
  isRural: CODES?.RURAL,
  villageName: "",
  panchayatUnionId: "",
  talukId: "",
  townPanchayatId: "",
  municipalityId: "",
  corporationId: "",
  MLAConstituencyId: "",
  MPConstituencyId: "",
  pincode: "",
  isSameAddress: false,
  doorNumberCommunication: "",
  flatNumberCommunication: "",
  streetNameCommunication: "",
  nagarNameCommunication: "",
  stateIdCommunication: "",
  districtIdCommunication: "",
  isRuralCommunication: CODES?.RURAL,
  villageNameCommunication: "",
  panchayatUnionIdCommunication: "",
  talukIdCommunication: "",
  townPanchayatIdCommunication: "",
  municipalityIdCommunication: "",
  corporationIdCommunication: "",
  MLAConstituencyIdCommunication: "",
  MPConstituencyIdCommunication: "",
  pincodeCommunication: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const fields = {
  doorNumber: {
    label: "Door No *",
    name: "doorNumber",
  },
  flatNumber: {
    label: "Flat No",
    name: "flatNumber",
  },
  streetName: {
    label: "Street Name *",
    name: "streetName",
  },
  nagarName: {
    label: "Nagar Name",
    name: "nagarName",
  },
  stateId: {
    label: "State *",
    name: "stateId",
  },
  districtId: {
    label: "District *",
    name: "districtId",
  },
  isRural: {
    label: "Location",
    name: "isRural",
  },
  villageName: {
    label: "Village Name *",
    name: "villageName",
  },
  panchayatUnionId: {
    label: "Panchayat Union *",
    name: "panchayatUnionId",
  },
  talukId: {
    label: "Taluk *",
    name: "talukId",
  },
  townPanchayatId: {
    label: "Town Panchayat *",
    name: "townPanchayatId",
  },
  municipalityId: {
    label: "Municipality *",
    name: "municipalityId",
  },
  corporationId: {
    label: "Corporation *",
    name: "corporationId",
  },
  MLAConstituencyId: {
    label: "MLA Constituency *",
    name: "MLAConstituencyId",
  },
  MPConstituancyId: {
    label: "MP Constituency *",
    name: "MPConstituencyId",
  },
  pincode: {
    label: "Pincode *",
    name: "pincode",
    type: "mobile",
  },
  isSameAddress: {
    label: "Permanent Address is Same as Communication Address",
    name: "isSameAddress",
  },
  doorNumberCommunication: {
    label: "Door No *",
    name: "doorNumberCommunication",
  },
  flatNumberCommunication: {
    label: "Flat No",
    name: "flatNumberCommunication",
  },
  streetNameCommunication: {
    label: "Street Name *",
    name: "streetNameCommunication",
  },
  nagarNameCommunication: {
    label: "Nagar Name",
    name: "nagarNameCommunication",
  },
  stateIdCommunication: {
    label: "State *",
    name: "stateIdCommunication",
  },
  districtIdCommunication: {
    label: "District *",
    name: "districtIdCommunication",
  },
  isRuralCommunication: {
    label: "Location",
    name: "isRuralCommunication",
  },
  villageNameCommunication: {
    label: "Village Name *",
    name: "villageNameCommunication",
  },
  panchayatUnionIdCommunication: {
    label: "Panchayat Union *",
    name: "panchayatUnionIdCommunication",
  },
  talukIdCommunication: {
    label: "Taluk *",
    name: "talukIdCommunication",
  },
  townPanchayatIdCommunication: {
    label: "Town Panchayat *",
    name: "townPanchayatIdCommunication",
  },
  municipalityIdCommunication: {
    label: "Municipality *",
    name: "municipalityIdCommunication",
  },
  corporationIdCommunication: {
    label: "Corporation *",
    name: "corporationIdCommunication",
  },
  MLAConstituencyIdCommunication: {
    label: "MLA Constituency *",
    name: "MLAConstituencyIdCommunication",
  },
  MPConstituancyIdCommunication: {
    label: "MP Constituency *",
    name: "MPConstituencyIdCommunication",
  },
  pincodeCommunication: {
    label: "Pincode *",
    name: "pincodeCommunication",
    type: "mobile",
  },
};

export const dependedValues = {
  villageName: "",
  panchayatUnionId: "",
  talukId: "",
  townPanchayatId: "",
  municipalityId: "",
  corporationId: "",
  MLAConstituencyId: "",
  MPConstituancyId: "",
  pincode: "",
};

export const dependentValuesCommunication = {
  villageNameCommunication: "",
  panchayatUnionIdCommunication: "",
  talukIdCommunication: "",
  townPanchayatIdCommunication: "",
  municipalityIdCommunication: "",
  corporationIdCommunication: "",
  MLAConstituencyIdCommunication: "",
  MPConstituancyIdCommunication: "",
  pincodeCommunication: "",
};
