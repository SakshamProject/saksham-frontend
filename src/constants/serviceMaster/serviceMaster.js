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

export const serviceNameColumns = ({
  tableEditId,
  handleDeleteList,
  handleEditList,
  isViewMode,
}) => [
  {
    Header: "Service Name",
    accessor: "name",
    width: 400,
    sticky: "left",
  },
  {
    Header: "   ",
    Cell: (props) => {
      return (
        <OptionsContainerChild style={{ justifyContent: "flex-end" }}>
          <WithCondition isValid={!isViewMode}>
            <div>
              <IconButton
                onClick={() => handleEditList(props?.row?.index)}
                disabled={tableEditId !== "" ? true : false}
              >
                <EditIcon disabled={tableEditId !== "" ? true : false} />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDeleteList(props?.row?.index);
                }}
                disabled={tableEditId !== "" ? true : false}
              >
                <DeleteIcon disabled={tableEditId !== "" ? true : false} />
              </IconButton>
            </div>
          </WithCondition>
        </OptionsContainerChild>
      );
    },
  },
];
