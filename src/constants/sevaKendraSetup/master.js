import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

export const initialValues = {
  name: "",
  stateId: "",
  districtId: "",
  address: "",
  landLineNumber: "",
  mobileNumber: "",
  startDate: "",
  contactPerson: {
    name: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
  },
  servicesBySevaKendra: [],
  auditLog: {
    status: "ACTIVE",
    date: "",
    description: "",
  },
};

export const fields = {
  name: {
    label: "Seva Kendra Name *",
    name: "name",
    type: "alphaNumeric",
  },
  stateId: {
    label: "State *",
    name: "stateId",
  },
  districtId: {
    label: "District *",
    name: "districtId",
  },
  address: {
    label: "Address *",
    name: "address",
    type: "alphaNumeric",
  },
  landLineNumber: {
    label: "Landline Number *",
    name: "landLineNumber",
    type: "mobile",
  },
  mobileNumber: {
    label: "Mobile No *",
    name: "mobileNumber",
    type: "mobile",
  },
  startDate: {
    label: "Seva Kendra Start Date *",
    name: "startDate",
  },
  contactPerson: {
    name: {
      label: "Contact Person Name *",
      name: "contactPerson.name",
      type: "alphabets",
    },
    email: {
      label: "Email Id *",
      name: "contactPerson.email",
      type: "email",
    },
    phoneNumber1: {
      label: "Primary Number *",
      name: "contactPerson.phoneNumber1",
      type: "mobile",
    },
    phoneNumber2: {
      label: "Secondary Number *",
      name: "contactPerson.phoneNumber2",
      type: "mobile",
    },
  },
  servicesBySevaKendra: {
    label: "Service Types *",
    name: "servicesBySevaKendra",
  },
};

export const sevakendraColumn = [
  {
    Header: "Seva Kendra Name",
    accessor: "name",
    filterAccessor: "sevaKendraName",
    width: 300,
    sticky: "left",
    Cell: (props) => (
      <OptionsContainer>
        {props?.value}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS?.SEVA_KENDRA_MASTER_FORM,
              view: true,
            },
            {
              label: "Edit",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS?.SEVA_KENDRA_MASTER_FORM,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "State",
    accessor: "state",
    filterAccessor: "state",
    width: 200,
  },
  {
    Header: "District",
    accessor: "district",
    filterAccessor: "district",
    width: 200,
  },
  {
    Header: "Contact Name",
    accessor: "contactPersonName",
    filterAccessor: "contactPersonName",
    width: 200,
  },
  {
    Header: "Contact Number",
    accessor: "contactPersonNumber",
    filterAccessor: "contactPersonNumber",
    width: 200,
  },
];
