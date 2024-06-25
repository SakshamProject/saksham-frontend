import React from "react";
import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

export const DIVYANG_STEPS = [
  {
    label: "Personal Details",
    route: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
    value: "personal",
  },
  {
    label: "Id Proof Uploads",
    route: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_IDPROOF,
    value: "idproof",
  },
  {
    label: "Address",
    route: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_ADDRESS,
    value: "address",
  },
  {
    label: "Disability Details",
    route: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_DISABILITY,
    value: "disability",
  },
  {
    label: "Employment Details",
    route: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_EMPLOYMENT,
    value: "employment",
  },
];

export const divyangDetailsColumn = [
  {
    Header: "First Name",
    accessor: "firstName",
    filterAccessor: "divyangFirstName",
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
              search: { action: "view" },
            },
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
              search: { action: "edit" },
            },
          ]}
        />
      </OptionsContainer>
    ),
    inputValues: ({ row }) => [
      {
        label: "View details",
        id: row?.id,
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
        view: true,
        search: { action: "view" },
      },
      {
        label: "Edit",
        id: row?.id,
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
        search: { action: "edit" },
      },
    ],
  },
  {
    Header: "Last Name",
    accessor: "lastName",
    filterAccessor: "divyangLastName",
    width: 240,
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
