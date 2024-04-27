import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer, theme } from "../../styles";
import { serviceStatus, yesNoSeed } from "../seeds";

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
    maxDate: new Date(),
  },
  endDate: {
    label: "End Date",
    name: "endDate",
    size: "small",
    maxDate: new Date(),
  },
};

export const listColumns = [
  {
    Header: "Seva Kendra State",
    // accessor: "name",
    // filterAccessor: "designations",
    width: 300,
    sticky: "left",
    Cell: ({ row, value }) => (
      <OptionsContainer>
        {value}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: row?.original?.id,
              path: ROUTE_PATHS.SERVICE_MAPPING_FORM,
              view: true,
            },
            {
              label: "Update Status",
              id: row?.original?.id,
              path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "District",
    // accessor: "sevaKendra.name",
    // filterAccessor: "sevaKendraName",
    width: 300,
  },
  {
    Header: "Seva Kendra",
    // accessor: "sevaKendra.district.state.name",
    // filterAccessor: "sevaKendraState",
    width: 300,
  },
  {
    Header: "Divyang",
    // accessor: "sevaKendra.district.name",
    // filterAccessor: "sevaKendraDistrict",
    width: 300,
  },
  {
    Header: "Service Name",
    // accessor: "sevaKendra.district.state.name",
    // filterAccessor: "sevaKendraState",
    width: 300,
  },
  {
    Header: "Service Date",
    // accessor: "sevaKendra.district.name",
    // filterAccessor: "sevaKendraDistrict",
    width: 200,
  },
  {
    Header: "Service Status",
    // accessor: "sevaKendra.district.name",
    // filterAccessor: "sevaKendraDistrict",
    width: 180,
  },
];

export const formFields = {
  searchDivyangId: {
    label: "Search By Divyang ID",
    name: "searchDivyangId",
    fieldType: "alphaNumeric",
  },
  searchMobileNo: {
    label: "Search By Mobile No",
    name: "searchMobileNo",
    type: "number",
  },
  searchAadharNo: {
    label: "Search By Aadhar No",
    name: "searchAadharNo",
    type: "number",
  },
  searchUDIDNo: {
    label: "Search By UDID No",
    name: "searchUDIDNo",
    fieldType: "alphaNumeric",
  },
  state: {
    label: "Select State *",
    name: "stateId",
  },
  district: {
    label: "Select District *",
    name: "districtId",
  },
  sevaKendra: {
    label: "Select seva kendra *",
    name: "sevaKendraId",
  },
  assignUser: {
    label: "Assign user *",
    name: "userId",
    getOptionLabel: (val) => `${val?.firstName} ${val?.lastName}`,
  },
  serviceType: {
    label: "Select service type *",
    name: "serviceTypeId",
  },
  serviceSubtype: {
    label: "Select service *",
    name: "serviceId",
  },
  dateOfService: {
    label: "Date of service *",
    name: "dateOfService",
    minDate: new Date(),
  },
  completedBefore: {
    label: "Service to be completed before *",
    name: "dueDate",
    minDate: new Date(),
  },
  contactPersonName: {
    label: "Contact Person name *",
    name: "nonSevaKendraFollowUp.name",
    fieldType: "alphabets",
  },
  mobileNo: {
    label: "Mobile No *",
    name: "nonSevaKendraFollowUp.mobileNumber",
    fieldType: "mobile",
  },
  emailId: {
    label: "Email *",
    name: "nonSevaKendraFollowUp.email",
    fieldType: "email",
  },
  emailStatus: {
    label: "Mail divyang details",
    name: "nonSevaKendraFollowUp.sendMail",
    inputValues: yesNoSeed,
    labelStyle: { fontWeight: "normal" },
  },
  isNonSevaKendraFollowUpRequired: {
    label: "Forward to non seva kendra volunteer",
    name: "isNonSevaKendraFollowUpRequired",
    inputValues: yesNoSeed,
  },
};

export const initialValues = {
  searchDivyangId: "",
  searchMobileNo: "",
  searchAadharNo: "",
  searchUDIDNo: "",

  stateId: "",
  districtId: "",
  sevaKendraId: "",
  userId: "",

  serviceTypeId: "",
  serviceId: "",
  dateOfService: "",
  dueDate: "",

  nonSevaKendraFollowUp: {
    name: "",
    mobileNumber: "",
    email: "",
    sendMail: "NO",
  },

  divyangId: "a599be29-d676-4ef9-9113-1a393eee2d02",
  isNonSevaKendraFollowUpRequired: "NO",
};
