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
    validationLabel: "Taluk",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.TALUK}`,
    // listKey: "employeeBranch",
    // nameKey: "branch",
  },
  municipality: {
    name: "name",
    label: "Municipality *",
    validationLabel: "Municipality",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.MUNICIPALITY}`,
    // listKey: "employeeDepartment",
    // nameKey: "department",
  },
  corporation: {
    name: "name",
    label: "Corporation *",
    validationLabel: "Corporation",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.COPERATION}`,
    // listKey: "employeeDesignation",
    // nameKey: "designation",
  },
  panchayatUnion: {
    name: "name",
    label: "Panchayat Union *",
    validationLabel: "Panchayat Union",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.PANCHAYAT_UNION}`,
    // listKey: "employeeGrade",
    // nameKey: "grade",
  },
  townPanchayat: {
    name: "name",
    label: "Town Panchayat *",
    validationLabel: "Town Panchayat",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.TOWN_PANCHAYAT}`,
    // listKey: "employeeReportingPerson",
    // nameKey: "reportingPerson",
  },
  mlaConstituency: {
    name: "name",
    label: "MLA Constituency *",
    validationLabel: "MLA Constituency",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.MLA_CONSTITUENCY}`,
    // listKey: "employeeHr",
    // nameKey: "hr",
  },
  mpConstituency: {
    name: "name",
    label: "MP Constituency *",
    validationLabel: "MP Constituency",
    apiPath: `${API_PATHS.STATE_MASTER}${API_PATHS.MP_CONSTITUENCY}`,
    // listKey: "employeeHr",
    // nameKey: "hr",
  },
};

export const fields = {
  stateId: {
    label: "State",
    name: "stateId",
  },
  districtId: {
    label: "District",
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
    accessor: `name`,
    width: 320,
    sticky: "left",
  },
  {
    Header: "Edit/Delete",
    minWidth: 150,
    sticky: "right",
    Cell: (props) => {
      return (
        <OptionsContainerChild>
          <div>
            <IconButton
              onClick={() => handleEditList(props?.row?.index)}
              disabled={tableEditId !== "" ? true : false}
            >
              <EditIcon color="primary"></EditIcon>
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteList(props?.row?.index);
              }}
              disabled={tableEditId !== "" ? true : false}
            >
              <DeleteIcon color="primary" />
            </IconButton>
          </div>
        </OptionsContainerChild>
      );
    },
  },
];
