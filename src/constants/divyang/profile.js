import { formatDate } from "../../utils/common";

export const permanentAddress = [
  "doorNumber",
  "flatNumber",
  "streetName",
  "nagarName",
  "villageName",
  "panchayatUnion",
  "townPanchayat",
  "municipality",
  "taluk",
  "corporation",
  "MLAConstituency",
  "MPConstituancy",
  "district",
  "state",
  "pincode",
];

export const communicationAddress = [
  "doorNumberCommunication",
  "flatNumberCommunication",
  "streetNameCommunication",
  "nagarNameCommunication",
  "villageNameCommunication",
  "panchayatUnionCommunication",
  "townPanchayatCommunication",
  "municipalityCommunication",
  "talukCommunication",
  "corporationCommunication",
  "MLAConstituencyCommunication",
  "MPConstituancyCommunication",
  "districtCommunication",
  "stateCommunication",
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
    cell: ({ value }) => value?.split("_")?.join(" "),
  },
];

export const divyangFilesDetail = [
  {
    title: "Voter ID",
    image: "voterId",
  },
  {
    title: "PAN Card",
    image: "panCard",
  },
  {
    title: "Driving License",
    image: "drivingLicense",
  },
  {
    title: "Ration Card",
    image: "rationCard",
  },
  {
    title: "Aadhar Card",
    image: "aadharCard",
  },
  {
    title: "Pension Card",
    image: "pensionCard",
  },
  {
    title: "Medical Insurance Card",
    image: "medicalInsuranceCard",
  },
  {
    title: "Disability Scheme Card",
    image: "disabilitySchemeCard",
  },
  {
    title: "BPA/APL Card",
    image: "BPL_OR_APL_Card",
  },
];
