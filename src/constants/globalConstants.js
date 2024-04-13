import { OptionsContainer } from "../styles";

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
};

// api messages
export const SERVER_ERROR = "Something went wrong. Please try again!";

export const ADDED_SUCCESSFULLY = (title) => `${title} Added successfully !`;

export const UPDATED_SUCCESSFULLY = (title) =>
  `${title} Updated successfully !`;

export const DELETED_SUCCESSFULLY = (title) =>
  `${title} Deleted successfully !`;

export const statusColumns = [
  {
    Header: "Status",
    width: 200,
    accessor: "createdAt",
    Cell: (props) => (
      <OptionsContainer>
        {props?.row?.original?.status?.name || ""}
      </OptionsContainer>
    ),
  },
  {
    Header: "Date",
    accessor: "effectiveDate",
    width: 150,
    Cell: (props) => (
      <OptionsContainer>{props?.value || "N/A"}</OptionsContainer>
    ),
  },
  {
    Header: "Reason",
    accessor: "deactivationReason",
    width: 150,
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
