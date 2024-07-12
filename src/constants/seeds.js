export const filterQuerySeed = [
  {
    id: "equals",
    name: "Equal",
  },
  {
    id: "notEquals",
    name: "Non Equal",
  },
  {
    id: "startsWith",
    name: "Begins With",
  },
  {
    id: "endsWith",
    name: "Ends With",
  },
];

export const genderSeed = (all) =>
  [
    {
      id: "MALE",
      name: "Male",
    },
    {
      id: "FEMALE",
      name: "Female",
    },
    all && {
      id: "TRANSGENDER",
      name: "TransGender",
    },
  ].filter((item) => item);

export const statusSeed = [
  {
    id: "ACTIVE",
    name: "Active",
  },
  {
    id: "DEACTIVE",
    name: "Deactive",
  },
];

export const yesNoSeed = [
  {
    id: "YES",
    name: "Yes",
  },
  {
    id: "NO",
    name: "No",
  },
];

export const serviceStatus = [
  {
    id: "PENDING",
    name: "Pending",
  },
  {
    id: "COMPLETED",
    name: "Completed",
  },
];

export const locationSeed = [
  {
    id: "RURAL",
    name: "Rural",
  },
  {
    id: "URBAN",
    name: "Urban",
  },
];

export const bloodGroup = [
  {
    id: "O_POSITIVE",
    name: "O Positive",
  },
  {
    id: "O_NEGATIVE",
    name: "O Negative",
  },
  {
    id: "B_POSITIVE",
    name: "B Positive",
  },
  {
    id: "B_NEGATIVE",
    name: "B Negative",
  },
  {
    id: "A_POSITIVE",
    name: "A Positive",
  },
  {
    id: "A_NEGATIVE",
    name: "A Negative",
  },
  {
    id: "AB_POSITIVE",
    name: "AB Positive",
  },
  {
    id: "AB_NEGATIVE",
    name: "AB Negative",
  },
  {
    id: "HH",
    name: "HH",
  },
  {
    id: "others",
    name: "Others",
  },
];

export const authorities = [
  {
    id: "MEDICAL_BOARD",
    name: "Medical Board",
  },
  {
    id: "GOVERNMENT_DOCTOR",
    name: "Government Doctor",
  },
  {
    id: "PRIVATE_DOCTOR",
    name: "Private Doctor",
  },
];

export const services = [
  {
    id: "SEVAKENDRA",
    name: "Sevakendra",
  },
  {
    id: "VOLUNTEER",
    name: "Volunteer",
  },
  {
    id: "WHATSAPP",
    name: "Whatsapp",
  },
];
