import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

export const initialValues = {
  stateId: "",
  districtId: "",
  sevaKendraId: "",
  designation: "",
  featuresId: [],
};

export const fields = {
  stateId: {
    label: "Seva Kendra State *",
    name: "stateId",
  },
  districtId: {
    label: "Seva Kendra District *",
    name: "districtId",
  },
  sevaKendraId: {
    label: "Seva Kendra Name *",
    name: "sevaKendraId",
  },
  designation: {
    label: "Designation *",
    name: "designation",
  },
  featuresId: {
    label: "Access",
    name: "featuresId",
  },
};

export const columns = [
  {
    Header: "Seva Kendra State",
    accessor: "state",
    filterAccessor: "sevaKendraState",
    width: 300,
    sticky: "left",
    Cell: ({ row }) => (
      <OptionsContainer>
        {row?.original?.sevaKendra?.district?.state?.name}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: row?.original?.id,
              path: ROUTE_PATHS.DESIGNATIONS_FORM,
              view: true,
            },
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS?.DESIGNATIONS_FORM,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "District",
    accessor: "district",
    width: 300,
    filterAccessor: "sevaKendraDistrict",
    Cell: ({ row }) => row?.original?.sevaKendra?.district?.name,
  },
  {
    Header: "Seva Kendra Name",
    accessor: "name",
    width: 300,
    filterAccessor: "sevaKendraName",
    Cell: ({ row }) => row?.original?.sevaKendra?.name,
  },
  {
    Header: "Designations",
    accessor: "designations",
    width: 300,
    filterAccessor: "designations",
    Cell: ({ row }) => row?.original?.name,
  },
];
