import { theme } from "../../styles";

export const listInitialValues = {
  status: "pending",
  districtId: "",
  startDate: "",
  endDate: "",
};

const serviceStatus = [
  {
    id: "pending",
    name: "Pending",
  },
  {
    id: "completed",
    name: "Completed",
  },
];

export const listFields = {
  status: {
    label: "Service Status",
    name: "status",
    labelStyle: { color: theme.palette?.commonColor?.blue },
    inputValues: serviceStatus,
  },
  districtId: {
    label: "Seva Kendra District",
    name: "districtId",
    size: "small",
    getOptionLabel: (option) => `${option?.name} - ${option?.state?.name}`,
  },
  startDate: {
    label: "Start Date",
    name: "startDate",
    size: "small",
  },
  endDate: {
    label: "End Date",
    name: "endDate",
    size: "small",
  },
};
