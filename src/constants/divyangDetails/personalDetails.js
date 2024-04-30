import { name } from "dayjs/locale/en-gb";
import { CODES } from "../globalConstants";
import { DeleteIcon, EditIcon, OptionsContainerChild } from "../../styles";
import { IconButton } from "@mui/material";

export const initialValues = {
  firstName: "",
  lastName: "",
  divyangId: "",
  picture: "",
  gender: CODES?.MALE,
  bloodGroup: "",
  dateOfBirth: "",
  age: "",
  mailId: "",
  mobileNumber: "",
  fatherName: "",
  motherName: "",
  isMarried: CODES?.NO,
  spouseName: "",
  spouseNumber: "",
  educationQualifications: [],
  religion: "",
  communityCategoryId: "",
  community: "",
  extraCurricularActivity: "",
  userName: "",
  password: "",
  confirmPassword: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const eqInitialValues = {
  educationQualificationId: "",
  educationQualificationTypeId: "",
};

export const fields = {
  firstName: {
    label: "Divyang First Name *",
    name: "firstName",
    type: "alphabets",
  },
  lastName: {
    label: "Divyang Last Name *",
    name: "lastName",
  },
  divyangId: {
    label: "Divyang ID *",
    name: "divyangId",
  },
  picture: {
    label: "Upload picture",
    name: "picture",
  },
  gender: {
    label: "Gender",
    name: "gender",
  },
  bloodGroup: {
    label: "Blood Group *",
    name: "bloodGroup",
  },
  dateOfBirth: {
    label: "Date of Birth *",
    name: "dateOfBirth",
  },
  age: {
    label: "Age",
    name: "age",
  },
  mailId: {
    label: "Mail ID *",
    name: "mailId",
    type: "email",
  },
  mobileNumber: {
    label: "Mobile Number *",
    name: "mobileNumber",
    type: "mobile",
  },
  fatherName: {
    label: "Father Name *",
    name: "fatherName",
    type: "alphabets",
  },
  motherName: {
    label: "Mother Name *",
    name: "motherName",
    type: "alphabets",
  },
  isMarried: {
    label: "Married",
    name: "isMarried",
  },
  spouseName: {
    label: "Spouse Name",
    name: "spouseName",
    type: "alphabets",
  },
  spouseNumber: {
    label: "Spouse Mobile No",
    name: "spouseNumber",
    type: "mobile",
  },
  educationQualifications: {
    name: "educationQualifications",
  },
  educationQualificationId: {
    label: "Select Educational Qualification",
    name: "educationQualificationId",
  },
  educationQualificationTypeId: {
    label: "Select Educational Qualification Sub Type *",
    name: "educationQualificationTypeId",
  },
  religion: {
    label: "Religion *",
    name: "religion",
    type: "alphabets",
  },
  communityCategoryId: {
    label: "Community Category *",
    name: "communityCategoryId",
  },
  community: {
    label: "Community *",
    name: "community",
    type: "alphabets",
  },
  extraCurricularActivity: {
    label: "Extra Curricular Activity, If any",
    name: "extraCurricularActivity",
  },
  userName: {
    label: "Login User Name *",
    name: "userName",
  },
  password: {
    label: "Password *",
    name: "password",
  },
  confirmPassword: {
    label: "Confirm Password *",
    name: "confirmPassword",
  },
};

export const eqColumns = ({
  tableEditId,
  handleDeleteList,
  handleEditList,
}) => [
  {
    Header: "Qualification",
    accessor: "educationQualificationId.name",
    width: 240,
    sticky: "left",
  },
  {
    Header: "Sub Type",
    accessor: "educationQualificationTypeId.name",
    Cell: ({ value }) => value || "-",
    width: 240,
  },
  {
    Header: "   ",
    Cell: (props) => {
      return (
        <OptionsContainerChild style={{ justifyContent: "flex-end" }}>
          <div>
            <IconButton
              onClick={() => handleEditList(props?.row?.index)}
              disabled={tableEditId === 0 || !!tableEditId}
            >
              <EditIcon disabled={tableEditId === 0 || !!tableEditId} />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteList(props?.row?.index);
              }}
              disabled={tableEditId === 0 || !!tableEditId}
            >
              <DeleteIcon disabled={tableEditId === 0 || !!tableEditId} />
            </IconButton>
          </div>
        </OptionsContainerChild>
      );
    },
  },
];
