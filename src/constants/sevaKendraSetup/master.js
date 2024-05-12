import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";
import { CODES } from "../globalConstants";

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
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const fields = {
  name: {
    label: "Seva Kendra Name *",
    name: "name",
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
  },
  landLineNumber: {
    label: "Landline Number *",
    name: "landLineNumber",
    fieldType: "mobile",
    maxLength: 10,
  },
  mobileNumber: {
    label: "Mobile No *",
    name: "mobileNumber",
    fieldType: "mobile",
    maxLength: 10,
  },
  startDate: {
    label: "Seva Kendra Start Date *",
    name: "startDate",
    minDate: new Date(),
  },
  contactPerson: {
    name: {
      label: "Contact Person Name *",
      name: "contactPerson.name",
    },
    email: {
      label: "Email",
      name: "contactPerson.email",
      fieldType: "email",
    },
    phoneNumber1: {
      label: "Primary Contact Number *",
      name: "contactPerson.phoneNumber1",
      fieldType: "mobile",
      maxLength: 10,
    },
    phoneNumber2: {
      label: "Secondary Contact Number",
      name: "contactPerson.phoneNumber2",
      fieldType: "mobile",
      maxLength: 10,
    },
  },
  servicesBySevaKendra: {
    label: "Service Types *",
    name: "servicesBySevaKendra",
    accessor: "service.name",
    getOptionLabel: (option) =>
      `${option?.name} - ${option?.serviceType?.name} `,
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
    accessor: "district.state.name",
    filterAccessor: "state",
    width: 240,
  },
  {
    Header: "District",
    accessor: "district.name",
    filterAccessor: "district",
    width: 240,
  },
  {
    Header: "Contact Name",
    accessor: "contactPerson.name",
    filterAccessor: "contactPersonName",
    width: 240,
  },
  {
    Header: "Contact Number",
    accessor: "contactPerson.phoneNumber1",
    filterAccessor: "contactPersonNumber",
    width: 240,
  },
];

export const transformServices = (services) =>
  services?.map((service) => ({ serviceId: service?.id }));
