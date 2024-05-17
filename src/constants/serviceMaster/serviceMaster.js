import { CustomCell, EditPopover } from "../../components/shared";
import { EditDelete } from "../../components/shared/EditDelete";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

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
    Cell: ({ value, row }) => (
      <OptionsContainer>
        {value}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: row?.original?.id,
              path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
              view: true,
            },
            {
              label: "Edit",
              id: row?.original?.id,
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
    Cell: ({ row }) => (
      <CustomCell
        value={row?.original?.service?.map((item) => item?.name)?.join(", ")}
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
    Cell: ({ row }) => {
      return (
        <EditDelete
          isViewMode={!!tableEditId || isViewMode}
          onEdit={() => handleEditList(row?.index)}
          onDelete={() => handleDeleteList(row?.index)}
        />
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
