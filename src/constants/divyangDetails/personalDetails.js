import { EditDelete } from "../../components/shared/EditDelete";
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
    label: "Spouse Name *",
    name: "spouseName",
  },
  spouseNumber: {
    label: "Spouse Mobile No *",
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
  isViewMode,
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
    Cell: ({ row }) => {
      return (
        <EditDelete
          isViewMode={isViewMode || tableEditId === 0 || !!tableEditId}
          onDelete={() => handleDeleteList(row?.index)}
          onEdit={() => handleEditList(row?.index)}
        />
      );
    },
  },
];

export const fileKeys = [
  "voterId",
  "panCard",
  "drivingLicense",
  "rationCard",
  "aadharCard",
  "pensionCard",
  "medicalInsuranceCard",
  "disabilitySchemeCard",
  "BPL_OR_APL_Card",
  "disabilityCard",
  "UDIDCard",
  "profilePhoto",
];

export const getFilesUrl = (files) =>
  files?.reduce((acc, file) => {
    const key = Object.keys(file)[0];
    if (key === "profilePhoto") {
      return { ...acc, [key]: file?.[key]?.url, picture: file?.[key]?.url };
    }
    if (fileKeys.includes(key)) {
      return { ...acc, [key]: file?.[key]?.url };
    }
    return acc;
  }, {});
