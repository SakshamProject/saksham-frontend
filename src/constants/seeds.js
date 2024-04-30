export const filterStringSeeds = [
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

export const genders = (all) =>
  [
    {
      id: "MALE",
      name: "Male",
      code: "male",
    },
    {
      id: "FEMALE",
      name: "Female",
      code: "female",
    },
    all
      ? {
          id: "TRANSGENDER",
          name: "TransGender",
          code: "transgender",
        }
      : "",
  ].filter((item) => item);

export const statusSeeds = [
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
  // {
  //   id: "STOPPED",
  //   name: "Stopped",
  // },
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
