import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

export const DIVYANG_STEPS = [
  {
    label: "Personal Details",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_PERSONAL,
    value: "personal",
  },
  {
    label: "Id Proff Uploads",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_IDPROOF,
    value: "idproff",
  },
  {
    label: "Address",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_ADDRESS,
    value: "address",
  },
  {
    label: "Disability Details",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_DISABILITY,
    value: "disability",
  },
  {
    label: "Employement Details",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_EMPLOYMENT,
    value: "employment",
  },
];

export const divyangDetailsColumn = [
  {
    Header: "Divyang Name",
    accessor: "firstName",
    filterAccessor: "divyangName",
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
              path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
              view: true,
            },
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "Divyang Id",
    accessor: "divyangId",
    filterAccessor: "divyangId",
    width: 240,
  },
  {
    Header: "Email",
    accessor: "mailId",
    filterAccessor: "emailID",
    width: 240,
  },
  {
    Header: "Mobile No",
    accessor: "mobileNumber",
    filterAccessor: "mobileNumber",
    width: 240,
  },
];
