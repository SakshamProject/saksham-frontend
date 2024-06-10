import { CustomCell, EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";
import { formatDate } from "../../utils/common";

export const initialValues = {
  stateId: "",
  districtId: "",
  sevaKendraId: "",
  serviceTypeId: "",
  serviceId: "",
  dateOfService: "",
  dueDate: "",
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
    Header: "Service Name",
    accessor: "service.name",
    filterAccessor: "serviceName",
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
              path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
              view: true,
            },
          ]}
        />
      </OptionsContainer>
    ),
    inputValues: ({ row }) => [
      {
        label: "View details",
        id: row?.id,
        path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
        view: true,
      },
      {
        label: "Update Status",
        id: row?.id,
        path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
      },
    ],
  },
  {
    Header: "Seva Kendra",
    accessor: "user.designation.sevaKendra.name",
    filterAccessor: "sevaKendraName",
    Cell: ({ row }) => (
      <CustomCell
        value={
          row?.original?.user?.designation?.sevaKendra?.name ||
          row?.original?.sevaKendra?.name
        }
      />
    ),
    width: 300,
  },
  {
    Header: "Divyang",
    accessor: "divyang.firstName",
    filterAccessor: "divyangName",
    width: 300,
  },
  {
    Header: "District",
    accessor: "user.designation.sevaKendra.district.name",
    filterAccessor: "district",
    Cell: ({ row }) => (
      <CustomCell
        value={
          row?.original?.user?.designation?.sevaKendra?.district?.name ||
          row?.original?.sevaKendra?.district?.name
        }
      />
    ),
    width: 300,
  },
  {
    Header: "State",
    accessor: "user.designation.sevaKendra.district.state.name",
    filterAccessor: "state",
    Cell: ({ row }) => (
      <CustomCell
        value={
          row?.original?.user?.designation?.sevaKendra?.district?.state?.name ||
          row?.original?.sevaKendra?.district?.state?.name
        }
      />
    ),
    width: 300,
  },
  {
    Header: "Service Date",
    filterAccessor: "serviceDate",
    Cell: ({ row }) => (
      <CustomCell
        value={formatDate({
          date: row?.original?.dateOfService,
          format: "DD-MM-YYYY",
        })}
      />
    ),
    responsiveCell: ({ row }) =>
      formatDate({
        date: row?.dateOfService,
        format: "DD-MM-YYYY",
      }),
    width: 200,
  },
  {
    Header: "Service Status",
    accessor: "isCompleted",
    filterAccessor: "serviceStatus",
    width: 180,
  },
];
