import { IconButton } from "@mui/material";
import { API_PATHS } from "../../api/apiPaths";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { DeleteIcon, EditIcon, OptionsContainerChild } from "../../styles";

export const initialValues = (name) => ({
  [name]: "",
  stateId: "",
  districtId: "",
});

export const STEPS = [
  {
    label: "Taluk",
    route: ROUTE_PATHS.STATE_MASTER_TALUK,
    value: "taluk",
  },
  {
    label: "Municipality",
    route: ROUTE_PATHS.STATE_MASTER_MUNICIPALITY,
    value: "municipality",
  },
  {
    label: "Corporation",
    route: ROUTE_PATHS.STATE_MASTER_CORPORATION,
    value: "corporation",
  },
  {
    label: "Panchayat Union",
    route: ROUTE_PATHS.STATE_MASTER_PANCHAYAT_UNION,
    value: "panchayatUnion",
  },
  {
    label: "Town Panchayat",
    route: ROUTE_PATHS.STATE_MASTER_TOWN_PANCHAYAT,
    value: "townPanchayat",
  },
  {
    label: "MLA Constituency",
    route: ROUTE_PATHS.STATE_MASTER_MLA_CONSTITUENCY,
    value: "mlaConstituency",
  },
  {
    label: "MP Constituency",
    route: ROUTE_PATHS.STATE_MASTER_MP_CONSTITUENCY,
    value: "mpConstituency",
  },
];

export const formDetails = {
  taluk: {
    name: "name",
    label: "Taluk *",
    routePath: ROUTE_PATHS.STATE_MASTER_TALUK,
    validationLabel: "Taluk",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.TALUK}`,
    fieldType: "alphaNumeric",
  },
  municipality: {
    name: "name",
    routePath: ROUTE_PATHS.STATE_MASTER_MUNICIPALITY,
    label: "Municipality *",
    validationLabel: "Municipality",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.MUNICIPALITY}`,
    fieldType: "alphaNumeric",
  },
  corporation: {
    name: "name",
    routePath: ROUTE_PATHS.STATE_MASTER_CORPORATION,
    label: "Corporation *",
    validationLabel: "Corporation",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.CORPORATION}`,
    fieldType: "alphaNumeric",
  },
  panchayatUnion: {
    name: "name",
    routePath: ROUTE_PATHS.STATE_MASTER_PANCHAYAT_UNION,
    label: "Panchayat Union *",
    validationLabel: "Panchayat Union",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.PANCHAYAT_UNION}`,
    fieldType: "alphaNumeric",
  },
  townPanchayat: {
    name: "name",
    routePath: ROUTE_PATHS.STATE_MASTER_TOWN_PANCHAYAT,
    label: "Town Panchayat *",
    validationLabel: "Town Panchayat",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.TOWN_PANCHAYAT}`,
    fieldType: "alphaNumeric",
  },
  mlaConstituency: {
    name: "name",
    routePath: ROUTE_PATHS.STATE_MASTER_MLA_CONSTITUENCY,
    label: "MLA Constituency *",
    validationLabel: "MLA Constituency",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.MLA_CONSTITUENCY}`,
    fieldType: "alphaNumeric",
  },
  mpConstituency: {
    name: "name",
    routePath: ROUTE_PATHS.STATE_MASTER_MP_CONSTITUENCY,
    label: "MP Constituency *",
    validationLabel: "MP Constituency",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.MP_CONSTITUENCY}`,
    fieldType: "alphaNumeric",
  },
};

export const fields = {
  stateId: {
    label: "State *",
    name: "stateId",
  },
  districtId: {
    label: "District *",
    name: "districtId",
  },
};

export const stateMasterColumns = ({
  currentForm,
  tableEditId,
  handleDeleteList,
  handleEditList,
}) => [
  {
    Header: currentForm?.validationLabel,
    accessor: "name",
    width: 220,
    sticky: "left",
  },
  {
    Header: "District",
    accessor: "district.name",
    width: 180,
  },
  {
    Header: "State",
    accessor: "district.state.name",
    width: 180,
  },
  {
    Header: " ",
    Cell: (props) => {
      const disabled = !!tableEditId;

      return (
        <OptionsContainerChild style={{ justifyContent: "flex-end" }}>
          <div>
            <IconButton
              onClick={() => handleEditList(props?.row?.index)}
              disabled={disabled}
            >
              <EditIcon disabled={disabled} />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteList(props?.row?.index)}
              disabled={disabled}
            >
              <DeleteIcon disabled={disabled} />
            </IconButton>
          </div>
        </OptionsContainerChild>
      );
    },
  },
];

export const tableStyles = {
  tableHead: {
    ".tr .th:first-child": {
      boxShadow: "none !important",
    },
  },
  tr: {
    "div:nth-child(5)": {
      flex: 1,
    },
  },
};
