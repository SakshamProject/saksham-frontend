import { API_PATHS } from "../../api/apiPaths";
import { EditPopover } from "../../components/shared";
import { EditDelete } from "../../components/shared/EditDelete";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer, theme } from "../../styles";

export const GENERAL_TYPES = {
  EDUCATIONAL_QUALIFICATION: "Educational Qualification",
  DISABILITY_TYPE: "Disability Type",
  COMMUNITY_CATEGORY: "Community Category",
  SERVICE_TYPE: "Service Type",
  STATE: "State",
  DISTRICT: "District",
};

export const GENERALTYPE_INCLUDE = [
  GENERAL_TYPES?.EDUCATIONAL_QUALIFICATION,
  GENERAL_TYPES?.DISABILITY_TYPE,
];

export const generalTypeApiPath = {
  [GENERAL_TYPES?.EDUCATIONAL_QUALIFICATION]:
    API_PATHS?.EDUCATION_QUALIFICATION,
  [GENERAL_TYPES?.DISABILITY_TYPE]: API_PATHS?.DISABILITY_TYPE,
  [GENERAL_TYPES?.COMMUNITY_CATEGORY]: API_PATHS?.COMMUNITY_CATEGORY,
  [GENERAL_TYPES?.SERVICE_TYPE]: API_PATHS?.SERVICE_TYPES,
  [GENERAL_TYPES?.STATE]: API_PATHS?.STATES,
  [GENERAL_TYPES?.DISTRICT]: API_PATHS?.DISTRICTS,
};

export const getGeneralTypePayload = (value, isPayload = true) => {
  const { typeMaster, ...remaining } = value;

  switch (typeMaster) {
    case GENERAL_TYPES?.SERVICE_TYPE:
      return isPayload
        ? { serviceType: remaining?.name }
        : { name: remaining?.name, typeMaster };

    case GENERAL_TYPES?.DISTRICT:
      return {
        name: remaining?.name,
        stateId: remaining?.stateId,
        ...(!isPayload && { typeMaster }),
      };

    case GENERAL_TYPES?.DISABILITY_TYPE:
      return isPayload
        ? {
            disabilityType: remaining?.name,
            disabilitySubType: remaining?.chips,
          }
        : {
            name: remaining?.name,
            chips: remaining?.disability,
            typeMaster,
            chip: "",
          };

    case GENERAL_TYPES?.EDUCATIONAL_QUALIFICATION:
      return isPayload
        ? {
            name: remaining?.name,
            educationQualification: remaining?.chips,
          }
        : {
            name: remaining?.name,
            chips: remaining?.educationQualification,
            typeMaster,
            chip: "",
          };

    default:
      return isPayload
        ? { name: remaining?.name }
        : { name: remaining?.name, typeMaster };
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
              label: "View Details",
              id: row?.original?.id,
              path: ROUTE_PATHS?.GENERAL_TYPES_FORM,
              stateProps: { field: value },
              view: true,
            },
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS?.GENERAL_TYPES_FORM,
              stateProps: { field: value },
            },
          ]}
        />
      </OptionsContainer>
    ),
    inputValues: ({ row, value }) => [
      {
        label: "View Details",
        id: row?.id,
        path: ROUTE_PATHS?.GENERAL_TYPES_FORM,
        stateProps: { field: value },
        view: true,
      },
      {
        label: "Edit",
        id: row?.id,
        path: ROUTE_PATHS?.GENERAL_TYPES_FORM,
        stateProps: { field: value },
      },
    ],
  },
];

export const generalColumns = ({
  handleDelete,
  tableEditId,
  handleEdit,
  isViewMode,
  type,
}) =>
  [
    {
      Header: type,
      accessor: "name",
      width: 300,
      sticky: "left",
    },
    type === GENERAL_TYPES?.DISTRICT && {
      Header: "State",
      accessor: "state.name",
      width: 300,
    },
    {
      Header: " ",
      Cell: ({ row }) => {
        return (
          <EditDelete
            isViewMode={!!tableEditId || isViewMode}
            onDelete={() => handleDelete(row?.original?.id)}
            onEdit={() => handleEdit(row?.original?.id)}
          />
        );
      },
      inputValues: ({ row }) => [
        {
          label: "Edit",
          onClick: () => handleEdit(row?.id),
        },
        {
          label: "Delete",
          onClick: () => handleDelete(row?.id),
        },
      ],
      disable: !!tableEditId || !!isViewMode,
    },
  ].filter((item) => item);

export const initialValues = {
  typeMaster: GENERAL_TYPES?.EDUCATIONAL_QUALIFICATION,
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
    label: "Type Name *",
    name: "name",
  },

  chipSetField: {
    label: "Sub Type Name",
    placeHolder: "Use enter key to add multiple sub type",
    name: "chip",
    chipVariant: "outlined",
  },

  stateId: {
    label: "Select State *",
    name: "stateId",
  },
};
