import { SaveOutlined } from "@mui/icons-material";
import { OptionsContainer } from "../styles";
import { formatDate } from "../utils/common";

// Regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const LOWER_CASE = /(?=.*?[a-z])/;
export const UPPER_CASE = /(?=.*?[A-Z])/;
export const NUMBER = /(?=.*?[0-9])/;
export const SPECIAL_CHARACTER =
  /(?=.*?[!@#$%^&*()\-_=+\\[\]{}\\|;:'",.<>\\/?`~])/;
export const VOTERID_REGEX = /^[A-Z]{3}[0-9]{7}$/;
export const PAN_REGEX = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
export const DRIVING_LICENSE_REGEX =
  /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
export const RATION_CARD_REGEX = /^([a-zA-Z0-9]){8,12}\s*$/;
export const AADHAR_CARD_REGEX = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
export const PERCENTAGE_REGEX = /\b(?:[1-9]|[1-9][0-9]|100)\b/;

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

// codes
export const CODES = {
  ACTIVE: "ACTIVE",
  DEACTIVE: "DEACTIVE",
  PENDING: "pending",
  REJECTED: "rejected",
  APPROVED: "approved",
  ADDED: "added",
  UPDATE: "update",
  DELETE: "delete",
  YES: "YES",
  NO: "NO",
  RURAL: "RURAL",
  URBAN: "URBAN",
  MALE: "MALE",
  FEMALE: "FEMALE",
  SAVED: "Saved",
};

// api messages
export const SERVER_ERROR = "Something went wrong. Please try again!";

// msg labels
export const DELETE_MSG = "Are you sure you want to delete this ";

// audit log columns
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

export const divyangDetailsColumn = [
  {
    accessor: "name",
    Header: "Name",
    Cell: (value) => `${value?.firstName}\xa0${value?.lastName}`,
  },
  {
    accessor: "mobileNumber",
    Header: "Mobile\xa0No",
  },
  {
    accessor: "divyangId",
    Header: "Divyang\xa0Id",
  },
  {
    accessor: "aadharCardNumber",
    Header: "Aadhar\xa0No",
  },
];
