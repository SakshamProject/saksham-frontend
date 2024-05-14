import { IconButton } from "@mui/material";
import {
  CustomCell,
  EditPopover,
  WithCondition,
} from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  DeleteIcon,
  EditIcon,
  OptionsContainer,
  OptionsContainerChild,
} from "../../styles";

export const initialValues = {
  serviceTypeId: "",
  name: "",
};

export const fields = {
  serviceTypeId: {
    label: "Select service type *",
    name: "serviceTypeId",
  },
  serviceName: {
    label: "Service Name *",
    name: "name",
  },
};

export const serviceMasterColumn = [
  {
    Header: "Service Type",
    accessor: "name",
    filterAccessor: "serviceTypeName",
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
              path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
              view: true,
            },
            {
              label: "Edit",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
            },
          ]}
        />
      </OptionsContainer>
    ),
    inputValues: ({ row }) => [
      {
        label: "View details",
        id: row?.id,
        path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
        view: true,
      },
      {
        label: "Edit",
        id: row?.id,
        path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
      },
    ],
  },
  {
    Header: "Service Provided",
    accessor: "service",
    filterAccessor: "serviceName",
    disableSortBy: true,
    width: 420,
    responsiveCell: ({ value }) => value?.map((item) => item?.name)?.join(", "),
    Cell: (props) => (
      <CustomCell
        value={props?.row?.original?.service
          ?.map((item) => item?.name)
          ?.join(", ")}
      />
    ),
  },
];

export const serviceNameColumns = ({
  tableEditId,
  handleDeleteList,
  handleEditList,
  isViewMode,
}) => [
  {
    Header: "Service Name",
    accessor: "name",
    width: 320,
    sticky: "left",
  },
  {
    Header: " ",
    Cell: (props) => {
      const disabled = !!tableEditId;

      return (
        <OptionsContainerChild style={{ justifyContent: "flex-end" }}>
          <WithCondition isValid={!isViewMode}>
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
          </WithCondition>
        </OptionsContainerChild>
      );
    },
    inputValues: ({ index }) => [
      {
        label: "Edit",
        onClick: () => handleEditList(index),
      },
      {
        label: "Delete",
        onClick: () => handleDeleteList(index),
      },
    ],
    disable: !!tableEditId || !!isViewMode,
  },
];
