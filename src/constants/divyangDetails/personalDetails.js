import { IconButton } from "@mui/material";
import { DeleteIcon, EditIcon, OptionsContainerChild } from "../../styles";
import { CODES } from "../globalConstants";

export const initialValues = {
  firstName: "",
  lastName: "",
  divyangId: "",
  picture: "",
  gender: CODES?.MALE,
  bloodGroup: "",
  dateOfBirth: "",
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
  UDIDCardNumber: "",
};

export const eqInitialValues = {
  educationQualificationTypeId: "",
  educationQualificationId: "",
};

export const fields = {
  firstName: {
    label: "Divyang First Name *",
    name: "firstName",
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
  mailId: {
    label: "Mail ID *",
    name: "mailId",
    fieldType: "email",
  },
  mobileNumber: {
    label: "Mobile Number *",
    name: "mobileNumber",
    fieldType: "mobile",
  },
  fatherName: {
    label: "Father Name *",
    name: "fatherName",
  },
  motherName: {
    label: "Mother Name *",
    name: "motherName",
  },
  isMarried: {
    label: "Married",
    name: "isMarried",
  },
  spouseName: {
    label: "Spouse Name",
    name: "spouseName",
  },
  spouseNumber: {
    label: "Spouse Mobile No",
    name: "spouseNumber",
    fieldType: "mobile",
  },
  educationQualifications: {
    name: "educationQualifications",
  },
  educationQualificationTypeId: {
    label: "Select Educational Qualification",
    name: "educationQualificationTypeId",
  },
  educationQualificationId: {
    label: "Select Educational Qualification Sub Type *",
    name: "educationQualificationId",
  },
  religion: {
    label: "Religion *",
    name: "religion",
  },
  communityCategoryId: {
    label: "Community Category *",
    name: "communityCategoryId",
  },
  community: {
    label: "Community *",
    name: "community",
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
  UDIDCardNumber: {
    label: "UDID Card No *",
    name: "UDIDCardNumber",
  },
};

export const eqColumns = ({
  tableEditId,
  handleDeleteList,
  handleEditList,
}) => [
  {
    Header: "Qualification",
    accessor: "educationQualificationTypeId.name",
    width: 240,
    sticky: "left",
  },
  {
    Header: "Sub Type",
    accessor: "educationQualificationId.name",
    Cell: ({ value }) => value || "-",
    width: 240,
  },
  {
    Header: " ",
    Cell: (props) => {
      const disabled = tableEditId === 0 || !!tableEditId;

      return (
        <OptionsContainerChild style={{ justifyContent: "flex-end" }}>
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
        </OptionsContainerChild>
      );
    },
  },
];
