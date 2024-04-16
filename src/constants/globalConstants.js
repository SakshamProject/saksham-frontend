import { OptionsContainer } from "../styles";
import { formatDate } from "../utils/common";

// regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// button labels
export const NEW = "NEW";
export const CANCEL = "Cancel";
export const CLEAR_FILTER = "Clear Filter";
export const APPLY = "Apply";
export const SUBMIT = "Submit";
export const UPDATE = "Update";
export const CONFIRM = "CONFIRM";
export const OKAY = "OKAY";
export const ADD = "Add";
export const SKIP = "Skip";
export const DELETE = "Delete";

export const CODES = {
  ACTIVE: "ACTIVE",
  DEACTIVE: "DEACTIVE",
  QUALIFICATION_TEN: "ten",
  QUALIFICATION_TWELVE: "twelve",
  PENDING: "pending",
  REJECTED: "rejected",
  APPROVED: "approved",
  ADDED: "added",
  UPDATE: "update",
  DELETE: "delete",
};

// api messages
export const SERVER_ERROR = "Something went wrong. Please try again!";

export const statusColumns = [
  {
    Header: "Status",
    width: 160,
    accessor: "createdAt",
    Cell: (props) => (
      <OptionsContainer>{props?.row?.original?.status || ""}</OptionsContainer>
    ),
  },
  {
    Header: "Date",
    accessor: "date",
    width: 160,
    Cell: (props) => (
      <OptionsContainer>
        {formatDate({ date: props?.value, format: "DD-MM-YYYY" }) || "N/A"}
      </OptionsContainer>
    ),
  },
  {
    Header: "Reason",
    accessor: "description",
    width: 320,
    Cell: (props) => <OptionsContainer>{props?.value || "-"}</OptionsContainer>,
  },
];

export const statusSeeds = [
  {
    id: "ACTIVE",
    name: "Active",
  },
  {
    id: "DEACTIVE",
    name: "Deactive",
  },
];
