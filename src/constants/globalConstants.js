import { OptionsContainer } from "../styles";
import { formatDate } from "../utils/common";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const LOWER_CASE = /(?=.*?[a-z])/;
export const UPPER_CASE = /(?=.*?[A-Z])/;
export const NUMBER = /(?=.*?\d)/;
export const SPECIAL_CHARACTER =
  /(?=.*?[!@#$%^&*()\-_=+\\[\]{}\\|;:'",.<>\\/?`~])/;
export const VOTERID_REGEX = /^[A-Z]{3}\d{7}$/;
export const PAN_REGEX = /[A-Z]{5}\d{4}[A-Z]/;
export const DRIVING_LICENSE_REGEX =
  /^(([A-Z]{2}\d{2})( )|([A-Z]{2}-\d{2}))((19|20)\d)\d{7}$/;
export const RATION_CARD_REGEX = /^([a-zA-Z0-9]){8,12}\s*$/;
export const AADHAR_CARD_REGEX = /^[2-9]\d{3}\d{4}\d{4}$/;
export const PINCODE_REGEX = /^[1-9]\d{5}$/;
export const PERCENTAGE_REGEX = /\b(?:[1-9]|[1-9]\d|100)\b/;
export const NUMBER_ALPHABET_REGEX = /^[0-9a-zA-Z]+$/;

export const COOKIE_KEYS = {
  TOKEN: "token",
  USER_INFO: "user",
};

export const LOCAL_STORAGE_KEYS = {
  REMEMBER: "remember",
};

export const CODES = {
  ACTIVE: "ACTIVE",
  DEACTIVE: "DEACTIVE",
  ADDED: "added",
  UPDATED: "updated",
  DELETED: "deleted",
  SAVED: "saved",
  CREATED: "created",
  YES: "YES",
  NO: "NO",
  RURAL: "RURAL",
  URBAN: "URBAN",
  MALE: "MALE",
  FEMALE: "FEMALE",
  DASHBOARD: "DASHBOARD",
  SEVAKENDRA_SETUP: "SEVAKENDRA_SETUP",
  SEVAKENDRA_USERS: "SEVAKENDRA_USERS",
  TYPE_MASTERS: "TYPE_MASTERS",
  DIVYANG_DETAILS: "DIVYANG_DETAILS",
  SERVICE_MASTER: "SERVICE_MASTER",
  SERVICE_MAPPING: "SERVICE_MAPPING",
  ADMIN: "admin",
  DIVYANG: "divyang",
  SEVA_KENDRA: "sevaKendra",
};

export const SERVER_ERROR = "Something went wrong. Please try again!";
export const LOGIN_SUCCESS = "Logged in successfully";
export const VALID_SEVA_KENDRA = "Valid seva kendra user !";
export const VALID_DIVYANG = "Valid divyang user !";
export const PASSWORD_SUCCESS = "Password updated successfully !";
export const TOKEN_EXPIRED = "Sorry, Token has expired !";
export const DELETE_MSG = "Are you sure you want to delete this ";

export const statusColumns = [
  {
    Header: "Status",
    width: 160,
    sticky: "left",
    Cell: ({ row }) => (
      <OptionsContainer>{row?.original?.status || ""}</OptionsContainer>
    ),
  },
  {
    Header: "Date",
    accessor: "date",
    width: 160,
    Cell: ({ value }) => (
      <OptionsContainer>
        {formatDate({ date: value, format: "DD-MM-YYYY" }) || "N/A"}
      </OptionsContainer>
    ),
  },
  {
    Header: "Reason",
    accessor: "description",
    width: 320,
    Cell: ({ value }) => <OptionsContainer>{value || "-"}</OptionsContainer>,
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
