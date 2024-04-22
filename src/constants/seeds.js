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
      id: "male",
      name: "Male",
      code: "male",
    },
    {
      id: "female",
      name: "Female",
      code: "female",
    },
    all
      ? {
          id: "transgender",
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
