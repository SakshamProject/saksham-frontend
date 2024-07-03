import { CustomCell, EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer, theme } from "../../styles";
import { formatDate } from "../../utils/common";
import { CODES } from "../globalConstants";
import { serviceStatus, services, yesNoSeed } from "../seeds";

export const listInitialValues = {
  serviceStatus: "PENDING",
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
      <CustomCell
        value={
          row?.original?.user?.designation?.sevaKendra?.name ||
          row?.original?.sevaKendra?.name
        }
      />
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
        value={
          row?.original?.user?.designation?.sevaKendra?.district?.name ||
          row?.original?.sevaKendra?.district?.name
        }
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
          row?.original?.user?.designation?.sevaKendra?.district?.state?.name ||
          row?.original?.sevaKendra?.district?.state?.name
        }
      />
    ),
    width: 300,
  },
  {
    Header: "Service Date",
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
  isCompleted: {
    label: "Completed",
    name: "isCompleted",
    inputValues: yesNoSeed,
  },
  completedDate: {
    label: "Completed Date *",
    name: "completedDate",
    maxDate: new Date(),
  },
  howTheyGotService: {
    label: "How they got service *",
    name: "howTheyGotService",
    inputValues: services,
  },
  reasonForNonCompletion: {
    label: "Reason for not completed *",
    name: "reasonForNonCompletion",
    fieldType: "alphaNumeric",
  },
  isFollowUpRequired: {
    label: "Further Follow up needed",
    name: "isFollowUpRequired",
    inputValues: yesNoSeed,
  },
  followUpdate: {
    label: "Follow up date *",
    name: "followUp.followUpdate",
  },
  followUpState: {
    label: "Follow up seva kendra state *",
    name: "followUp.stateId",
  },
  followUpDistrict: {
    label: "Follow up seva kendra district *",
    name: "followUp.districtId",
  },
  followUpSevaKendra: {
    label: "Follow up seva kendra *",
    name: "followUp.sevaKendraId",
  },
  followUpUser: {
    label: "Follow up user *",
    name: "followUp.userId",
    getOptionLabel: (val) => `${val?.firstName} ${val?.lastName}`,
  },
  donorName: {
    label: "Donor Name",
    name: "donor.name",
    fieldType: "alphabets",
  },
  donorContact: {
    label: "Donor Contact",
    name: "donor.contact",
    fieldType: "mobile",
  },
  donorAddress: {
    label: "Donor Address",
    name: "donor.address",
    fieldType: "alphaNumeric",
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

export const editInitialValues = {
  isCompleted: CODES?.NO,
  isNonSevaKendraFollowUpRequired: false,
  completedDate: "",
  howTheyGotService: "",
  reasonForNonCompletion: "",
  nonSevaKendraFollowUp: {
    name: "",
    mobileNumber: "",
    email: "",
    sendMail: CODES?.NO,
  },
  donor: {
    name: "",
    contact: "",
    address: "",
  },
  isFollowUpRequired: CODES?.NO,
  followUp: {
    followUpdate: "",
    stateId: "",
    districtId: "",
    sevaKendraId: "",
    userId: "",
  },
};
