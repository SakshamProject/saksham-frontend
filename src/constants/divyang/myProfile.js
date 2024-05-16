import { formatDate } from "../../utils/common";

export const permanentAddress = [
  "doorNumber",
  "flatNumber",
  "streetName",
  "nagarName",
  "stateId",
  "district",
  "villageName",
  "panchayatUnionId",
  "talukId",
  "townPanchayatId",
  "municipalityId",
  "corporationId",
  "MLAConstituencyId",
  "MPConstituancyId",
  "pincode",
];

export const communicationAddress = [
  "doorNumberCommunication",
  "flatNumberCommunication",
  "streetNameCommunication",
  "nagarNameCommunication",
  "stateIdCommunication",
  "districtIdCommunication",
  "villageNameCommunication",
  "panchayatUnionIdCommunication",
  "talukIdCommunication",
  "townPanchayatIdCommunication",
  "municipalityIdCommunication",
  "corporationIdCommunication",
  "MLAConstituencyIdCommunication",
  "MPConstituancyIdCommunication",
  "pincodeCommunication",
];

export const divyangBasicDetails = [
  {
    label: "DOB",
    accessor: "dateOfBirth",
    cell: ({ value }) => formatDate({ date: value, format: "DD-MM-YYYY" }),
  },
  {
    label: "Mail ID",
    accessor: "mailId",
  },
  {
    label: "Mobile No",
    accessor: "mobileNumber",
  },
  {
    label: "Blood Group",
    accessor: "bloodGroup",
  },
];
