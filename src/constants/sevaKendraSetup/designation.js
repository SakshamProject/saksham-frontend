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
    fieldType: "alphabets",
  },
  featuresId: {
    label: "Access",
    name: "featuresId",
  },
};

export const columns = [
  {
    Header: "Designations",
    accessor: "name",
    width: 300,
    filterAccessor: "designations",
    sticky: "left",
    Cell: ({ row, value }) => (
      <OptionsContainer>
        {value}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: row?.original?.id,
              path: ROUTE_PATHS?.DESIGNATIONS_FORM,
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
    Header: "Seva Kendra Name",
    accessor: "sevaKendra.name",
    filterAccessor: "sevaKendraName",
    width: 300,
  },
  {
    Header: "Seva Kendra State",
    accessor: "sevaKendra.district.state.name",
    filterAccessor: "sevaKendraState",
    width: 300,
  },
  {
    Header: "District",
    accessor: "sevaKendra.district.name",
    width: 300,
    filterAccessor: "sevaKendraDistrict",
  },
];
