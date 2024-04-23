import { theme } from "../../styles";
import { serviceStatus } from "../seeds";

export const listInitialValues = {
  serviceStatus: "",
  districtId: "",
  startDate: "",
  endDate: "",
};

export const listFields = {
  serviceStatus: {
    label: "Service Status",
    name: "serviceStatus",
    labelStyle: {
      color: theme.palette?.commonColor?.blue,
    },
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
    maxDate: new Date(),
  },
};

export const formFields = {
  searchDivyangId: {
    label: "Search By Divyang ID",
    name: "searchDivyangId",
  },
  searchMobileNo: {
    label: "Search By Mobile No",
    name: "searchMobileNo",
  },
  searchAadharNo: {
    label: "Search By Aadhar No",
    name: "searchAadharNo",
  },
  searchUDIDNo: {
    label: "Search By UDID No",
    name: "searchUDIDNo",
  },
  state: {
    label: "Select seva kendra state",
    name: "state",
  },
  district: {
    label: "Select seva kendra district",
    name: "district",
  },
  sevaKendra: {
    label: "Select seva kendra",
    name: "sevaKendra",
  },
  assignUser: {
    label: "Assign user",
    name: "assignUser",
  },
  serviceType: {
    label: "Select service type",
    name: "serviceType",
  },
  serviceSubtype: {
    label: "Select service sub type",
    name: "serviceSubtype",
  },
  service: {
    label: "Select service",
    name: "service",
  },
  dateOfService: {
    label: "Date of service",
    name: "dateOfService",
  },
  completedBefore: {
    label: "Service to be completed before",
    name: "completedBefore",
  },
  contactPersonName: {
    label: "Contact Person name",
    name: "contactPersonName",
  },
  mobileNo: {
    label: "Mobile No",
    name: "mobileNo",
  },
  emailId: {
    label: "Email",
    name: "emailId",
  },
  emailStatus: {
    label: "Mail divyang details",
    name: "emailStatus",
    inputValues: [],
  },
};
