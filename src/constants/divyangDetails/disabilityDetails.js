import { EditDelete } from "../../components/shared/EditDelete";
import { CODES } from "../globalConstants";

export const initialValues = {
  disabilities: [],
  identityCardNumber: "",
  stateCode: "",
  districtCode: "",
  UDIDCardNumber: "",
  UDIDEnrollmentNumber: "",
  UDIDCardFile: "",
  status: CODES?.ACTIVE,
  date: new Date(),
  description: "",
};

export const multiPartInitialState = {
  disabilityTypeId: "",
  disabilitySubTypeId: "",
  isDisabilitySinceBirth: CODES?.YES,
  disabilitySince: "",
  disabilityArea: "",
  disabilityPercentage: "",
  disabilityDueTo: "",
  certificateIssueAuthority: "",
  disabilityCards: "",
  dateOfIssue: "",
};

export const fields = {
  disabilityType: {
    label: "Disability Type *",
    name: "disabilityTypeId",
  },
  disabilities: {
    label: "Disability Sub Type *",
    name: "disabilitySubTypeId",
  },
  isDisabilitySinceBirth: {
    label: "Disability Since Birth",
    name: "isDisabilitySinceBirth",
  },
  disabilitySince: {
    label: "Disability Since *",
    name: "disabilitySince",
  },

  disabilityArea: {
    label: "Disability Area *",
    name: "disabilityArea",
  },
  disabilityPercentage: {
    label: "Disability Percentage *",
    name: "disabilityPercentage",
    type: "mobile",
  },
  disabilityDueTo: {
    label: "Disability Due To *",
    name: "disabilityDueTo",
  },
  certificateIssuingAuthority: {
    label: "Certificate Issuing Authority *",
    name: "certificateIssueAuthority",
  },
  disabilityCards: {
    label: "Upload Disability Card",
    name: "disabilityCards",
  },
  dateOfIssue: {
    label: "Date of Issue *",
    name: "dateOfIssue",
  },
  stateCode: {
    label: "State Code *",
    name: "stateCode",
  },
  districtCode: {
    label: "District Code *",
    name: "districtCode",
  },
  identityCardNumber: {
    label: "Identity Card Number *",
    name: "identityCardNumber",
  },
  udidCardNumber: {
    label: "UDID Card Number *",
    name: "UDIDCardNumber",
    type: "alphaNumeric",
  },
  udidEnrollmentNumber: {
    label: "UDID Enrollment Number *",
    name: "UDIDEnrollmentNumber",
    type: "alphaNumeric",
  },
  udidCardUrl: {
    label: "Upload UDID Card",
    name: "UDIDCardFile",
  },
};

export const columnData = ({
  data,
  tableEditId,
  handleDeleteList,
  handleEditList,
}) => [
  {
    Header: "Disability Type",
    accessor: "disabilityType",
    width: 220,
    sticky: "left",
    Cell: (props) => props?.value?.name || "",
  },
  {
    Header: "Disability Sub Type",
    accessor: "disabilitySubType",
    width: 220,
    // Cell: ({ row }) =>
    //   data
    //     ?.find((item) => row?.original?.disabilityTypeId === item?.id)
    //     ?.disability?.find(
    //       (item) => row?.original?.disabilitySubTypeId === item?.id
    //     )?.name || "-",
    Cell: (props) => props?.value?.name || "",
  },
  {
    Header: "Action",
    Cell: ({ row }) => {
      return (
        <EditDelete
          onEdit={() => {
            handleEditList(row?.original?.id);
          }}
          onDelete={() => {
            handleDeleteList(row?.original?.id);
          }}
          isViewMode={!!tableEditId || tableEditId === 0}
        />
      );
    },
    inputValues: ({ index }) => [
      {
        label: "Edit",
        onClick: () => handleEditList(index),
      },
      {
        label: "Delete",
        onClick: () => handleDeleteList(index),
      },
    ],
    disable: !!tableEditId || tableEditId === 0,
  },
];
