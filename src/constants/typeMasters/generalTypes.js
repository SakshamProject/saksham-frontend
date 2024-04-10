import { Box } from "@mui/material";

import { API_PATHS } from "../../api/apiPaths";
import { EditPopover, WithCondition } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  DeleteIcon,
  EditIcon,
  OptionsContainer,
  OptionsContainerChild,
  StyledIconButton,
  theme,
} from "../../styles";

// General Types
export const EDUCATIONAL_QUALIFICATION = "Educational Qualification";
export const DISABILITY_TYPE = "Disability Type";
export const COMMUNITY_CATEGORY = "Community Category";
export const SERVICE_TYPE = "Service Type";
export const STATE = "State";
export const DISTRICT = "District";

export const generalTypeApiPath = (value) => {
  switch (value?.typeMaster) {
    case EDUCATIONAL_QUALIFICATION:
      return API_PATHS.EDUCATION_QUALIFICATION;
    case DISABILITY_TYPE:
      return API_PATHS.DISABILITY_TYPE;
    case COMMUNITY_CATEGORY:
      return API_PATHS.COMMUNITY_CATEGORY;
    case SERVICE_TYPE:
      return API_PATHS.SERVICE_TYPES;
    case STATE:
      return API_PATHS.STATES;
    case DISTRICT:
      return API_PATHS.DISTRICTS;
    default:
      return "";
  }
};

export const getGeneralTypePayload = (value, isviewMode) => {
  const { typeMaster, ...remaining } = value;

  switch (typeMaster) {
    case SERVICE_TYPE:
      return { serviceType: remaining?.name };
    case DISTRICT:
      return { name: remaining?.name, stateId: remaining?.stateId };
    case DISABILITY_TYPE:
      return isviewMode
        ? {
            disabilityType: remaining?.name,
            disabilitySubType: remaining?.chips,
          }
        : {
            disabilityType: remaining?.name,
            disabilitySubType: remaining?.chips,
          };

    default:
      return { name: remaining?.name };
  }
};

export const generalTypeColumns = [
  {
    Header: "Type Master",
    accessor: "name",
    width: 300,
    sticky: "left",
    Cell: ({ value, row }) => (
      <OptionsContainer>
        {value}
        <EditPopover
          inputValues={[
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS.GENERAL_TYPES_FORM,
              stateProps: { field: value },
            },
            {
              label: "View Details",
              id: row?.original?.id,
              path: ROUTE_PATHS.GENERAL_TYPES_FORM,
              stateProps: { field: value },
              view: true,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
];

export const generalColumns = ({
  handleDelete,
  tableEditId,
  handleEdit,
  isViewMode,
}) => [
  {
    Header: "Type Name",
    accessor: "name",
    width: 400,
    sticky: "left",
  },
  {
    Header: " ",
    Cell: ({ row }) => {
      return (
        <OptionsContainerChild>
          <WithCondition isValid={!isViewMode}>
            <Box>
              <StyledIconButton
                onClick={() => handleEdit(row?.original?.id)}
                disabled={tableEditId !== "" ? true : false}
              >
                <EditIcon disabled={tableEditId !== "" ? true : false} />
              </StyledIconButton>
              <StyledIconButton
                onClick={() => handleDelete(row?.original?.id)}
                disabled={tableEditId !== "" ? true : false}
              >
                <DeleteIcon disabled={tableEditId !== "" ? true : false} />
              </StyledIconButton>
            </Box>
          </WithCondition>
        </OptionsContainerChild>
      );
    },
  },
];

export const initialValues = {
  typeMaster: "Community Category",
  name: "",
  chip: "",
  stateId: "",
  chips: [],
};

export const fields = {
  typeMaster: {
    label: "Type Master",
    name: "typeMaster",
    accessor: "name",
    labelStyle: {
      color: theme.palette?.textColor?.blue,
    },
  },

  name: {
    label: "Enter Type Name",
    name: "name",
  },

  chipSetField: {
    placeHolder: "Enter Sub Type Name",
    name: "chip",
    chipVariant: "outlined",
  },

  stateId: {
    label: "Select State",
    name: "stateId",
  },
};
