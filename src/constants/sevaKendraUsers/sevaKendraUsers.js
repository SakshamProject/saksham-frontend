import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";
import { CODES } from "../globalConstants";

export const initialValues = {
  stateId: "",
  districtId: "",
  sevaKendraId: "",
  userId: "",
  profilePhoto: "",
  firstName: "",
  lastName: "",
  gender: CODES?.MALE,
  dateOfBirth: "",
  designationId: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  userName: "",
  password: "",
  confirmPassword: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
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
  profilePhoto: {
    label: "Upload Picture",
    name: "profilePhoto",
  },
  firstName: {
    label: "First Name *",
    name: "firstName",
  },
  lastName: {
    label: "Last Name *",
    name: "lastName",
  },
  gender: {
    label: "Gender",
    name: "gender",
  },
  dateOfBirth: {
    label: "Date of Birth",
    name: "dateOfBirth",
  },
  designationId: {
    label: "Select Designation *",
    name: "designationId",
  },
  email: {
    label: "Personal Mail Id *",
    name: "email",
    fieldType: "email",
  },
  contactNumber: {
    label: "Personal Contact No *",
    name: "contactNumber",
    fieldType: "mobile",
  },
  whatsappNumber: {
    label: "WhatsApp Number",
    name: "whatsappNumber",
    fieldType: "mobile",
  },
  userName: {
    label: "Login Id *",
    name: "userName",
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
    filterAccessor: "name",
    width: 300,
    sticky: "left",
    Cell: ({ row }) => (
      <OptionsContainer>
        {`${row?.original?.firstName} ${row?.original?.lastName}`}
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
    inputValues: ({ row }) => [
      {
        label: "View details",
        id: row?.id,
        path: ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM,
        view: true,
      },
      {
        label: "Edit",
        id: row?.id,
        path: ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM,
      },
    ],
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
    Header: "Designation",
    accessor: "designation.name",
    filterAccessor: "designationName",
    width: 240,
  },
];
