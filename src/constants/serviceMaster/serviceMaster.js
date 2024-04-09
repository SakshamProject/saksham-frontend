import { CustomCell, EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

export const initialValues = {
  serviceTypeId: "",
  name: "",
};

export const fields = {
  serviceTypeId: {
    label: "Select service type",
    name: "serviceTypeId",
  },
  serviceName: {
    label: "Service Name",
    name: "name",
  },
};

export const serviceMasterColumn = [
  {
    Header: "Service type",
    accessor: "name",
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
  },
  {
    Header: "Service Provided",
    accessor: "service",
    width: 420,
    Cell: (props) => (
      <CustomCell
        value={props?.row?.original?.service
          ?.map((item) => item?.name)
          ?.join(", ")}
      />
    ),
  },
];
