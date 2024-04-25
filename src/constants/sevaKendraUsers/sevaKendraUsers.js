import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";
import { CODES } from "../globalConstants";

export const initialValues = {
  stateId: "",
  districtId: "",
  sevaKendraId: "",
  userId: "",
  picture: "",
  firstName: "",
  lastName: "",
  gender: CODES?.MALE,
  dateOfBirth: "",
  designationId: "",
  email: "",
  contactNumber: "",
  whatsAppNumber: "",
  loginId: "",
  password: "",
  confirmPassword: "",
  auditLog: {
    status: "ACTIVE",
    date: "",
    description: "",
  },
};

export const fields = {
  stateId: {
    label: "Select Seva Kendra State *",
    name: "stateId",
  },
  districtId: {
    label: "Select Seva Kendra District *",
    name: "districtId",
  },
  sevaKendraId: {
    label: "Select Seva Kendra *",
    name: "sevaKendraId",
  },
  userId: {
    label: "User ID *",
    name: "userId",
  },
  picture: {
    label: "Upload picture",
    name: "picture",
  },
  firstName: {
    label: "First Name *",
    name: "firstName",
    type: "alphabets",
  },
  lastName: {
    label: "Last Name *",
    name: "lastName",
    type: "alphabets",
  },
  gender: {
    label: "Gender",
    name: "gender",
  },
  dateOfBirth: {
    label: "Date of Birth *",
    name: "dateOfBirth",
  },
  designationId: {
    label: "Select Designation *",
    name: "designationId",
  },
  email: {
    label: "Personal Mail Id *",
    name: "email",
    type: "email",
  },
  contactNumber: {
    label: "Personal Contact No *",
    name: "contactNumber",
    type: "mobile",
  },
  whatsAppNumber: {
    label: "WhatsApp Number *",
    name: "whatsAppNumber",
    type: "mobile",
  },
  loginId: {
    label: "Login Id *",
    name: "loginId",
  },
  password: {
    label: "Password *",
    name: "password",
  },
  confirmPassword: {
    label: "Confirm Password *",
    name: "confirmPassword",
  },
};

export const sevakendraUsersColumn = [
  {
    Header: "User Name",
    accessor: "firstName",
    filterAccessor: "n",
    width: 300,
    sticky: "left",
    Cell: ({ row }) => (
      <OptionsContainer>
        {row?.original?.firstName + " " + row?.original?.lastName}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: row?.original?.id,
              path: ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM,
              view: true,
            },
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "State",
    accessor: "designation.sevaKendra.district.state.name",
    filterAccessor: "state",
    width: 240,
  },
  {
    Header: "District",
    accessor: "designation.sevaKendra.district.name",
    filterAccessor: "district",
    width: 240,
  },
  {
    Header: "Seva Kendra Name",
    accessor: "designation.sevaKendra.name",
    filterAccessor: "sevaKendraName",
    width: 240,
  },
  {
    Header: "designation",
    accessor: "designation.name",
    filterAccessor: "designationName",
    width: 240,
  },
];
