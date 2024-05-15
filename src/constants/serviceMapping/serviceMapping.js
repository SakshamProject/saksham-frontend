import { CustomCell, EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer, theme } from "../../styles";
import { formatDate } from "../../utils/common";
import { CODES } from "../globalConstants";
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
    Header: "Service Name",
    accessor: "service.name",
    filterAccessor: "serviceName",
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
              path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
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
    inputValues: ({ row }) => [
      {
        label: "View details",
        id: row?.id,
        path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
        view: true,
      },
      {
        label: "Update Status",
        id: row?.id,
        path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
      },
    ],
  },
  {
    Header: "Seva Kendra",
    accessor: "user.designation.sevaKendra.name",
    filterAccessor: "sevaKendraName",
    Cell: ({ row }) => (
      <CustomCell value={row?.original?.user?.designation?.sevaKendra?.name} />
    ),
    width: 300,
  },
  {
    Header: "Divyang",
    accessor: "divyang.firstName",
    filterAccessor: "divyangName",
    width: 300,
  },
  {
    Header: "District",
    accessor: "user.designation.sevaKendra.district.name",
    filterAccessor: "district",
    Cell: ({ row }) => (
      <CustomCell
        value={row?.original?.user?.designation?.sevaKendra?.district?.name}
      />
    ),
    width: 300,
  },
  {
    Header: "State",
    accessor: "user.designation.sevaKendra.district.state.name",
    filterAccessor: "state",
    Cell: ({ row }) => (
      <CustomCell
        value={
          row?.original?.user?.designation?.sevaKendra?.district?.state?.name
        }
      />
    ),
    width: 300,
  },
  {
    Header: "Service Date",
    filterAccessor: "serviceDate",
    Cell: ({ row }) => (
      <CustomCell
        value={formatDate({
          date: row?.original?.dateOfService,
          format: "DD-MM-YYYY",
        })}
      />
    ),
    responsiveCell: ({ row }) =>
      formatDate({
        date: row?.dateOfService,
        format: "DD-MM-YYYY",
      }),
    width: 200,
  },
  {
    Header: "Service Status",
    accessor: "isCompleted",
    filterAccessor: "serviceStatus",
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
    sendMail: CODES?.NO,
  },
  divyangId: "",
  isNonSevaKendraFollowUpRequired: CODES?.NO,
};
