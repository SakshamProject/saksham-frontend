import { Box, Grid, styled } from "@mui/material";
import { DividerLine, EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { CustomTypography, OptionsContainer, theme } from "../../styles";
import React from "react";

export const DIVYANG_STEPS = [
  {
    label: "Personal Details",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_PERSONAL,
    value: "personal",
  },
  {
    label: "Id Proff Uploads",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_IDPROOF,
    value: "idproff",
  },
  {
    label: "Address",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_ADDRESS,
    value: "address",
  },
  {
    label: "Disability Details",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_DISABILITY,
    value: "disability",
  },
  {
    label: "Employment Details",
    route: ROUTE_PATHS.DIVYANG_DETAILS_FORM_EMPLOYMENT,
    value: "employment",
  },
];

export const divyangDetailsColumn = [
  {
    Header: "Divyang Name",
    accessor: "firstName",
    filterAccessor: "divyangName",
    width: 300,
    sticky: "left",
    Cell: ({ row }) => (
      <OptionsContainer>
        {row?.original?.firstName + " " + row?.original?.lastName}
        <EditPopover
          inputValues={[
            {
              label: "View details",
              id: row?.original?.id,
              path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
              view: true,
            },
            {
              label: "Edit",
              id: row?.original?.id,
              path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "Divyang Id",
    accessor: "divyangId",
    filterAccessor: "divyangId",
    width: 240,
  },
  {
    Header: "Email",
    accessor: "mailId",
    filterAccessor: "emailID",
    width: 240,
  },
  {
    Header: "Mobile No",
    accessor: "mobileNumber",
    filterAccessor: "mobileNumber",
    width: 240,
  },
];

// const CustomBox = styled(Box)(({ theme, matches, width }) => ({
//   display: "flex",
//   flexDirection: matches === "true" ? "row" : "column",
//   justifyContent: matches === "true" ? "space-between" : "center",
//   width: matches === "true" ? width || "25%" : "25%",
// }));

// const CustomDataShower = ({ title, value, link, matches, width }) => {
//   return (
//     <Box
//       sx={{
//         marginBottom: "8px",
//         display: "flex",
//         alignItems: matches === "true" ? "start" : "center",
//         flexDirection: "column",
//         width: matches === "true" ? width || "25%" : "100%",
//       }}
//     >
//       <Box
//         sx={{
//           fontSize: "16px",
//           fontWeight: "600",
//           marginBottom: "6px",
//         }}
//       >
//         {title}
//       </Box>
//       {link ? (
//         <Box
//           sx={{
//             fontStyle: "italic",
//             color: theme.palette?.commonColor?.barkBlue,
//             textDecoration: "underline",
//             marginBottom: "6px",
//             cursor: "pointer",
//           }}
//         >
//           View File
//         </Box>
//       ) : (
//         <Box
//           sx={{
//             fontSize: "15px",
//             marginBottom: "6px",
//           }}
//         >
//           {value}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export const divayangDetail = () => [
//   { title: "DOB", value: "1/1/93" },
//   { title: "Mail ID", value: "Lorem@gmail.com" },
//   { title: "Mobile No", value: "9876543210" },
//   { title: "Blood Group", value: "B +ve", divider: true },
//   {
//     title: "Permanent Address",
//     value:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
//     width: "100%",
//   },
//   {
//     title: "Temporary Address",
//     value:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
//     width: "100%",
//     divider: true,
//   },
//   {
//     title: "Disability Details(1)",
//     details: [
//       { title: "Name", value: "Lorem Ipsum" },
//       { title: "Type", value: "Lorem Ipsum" },
//       { title: "Disability Since", value: "Lorem Ipsum" },
//       { title: "Disability Area", value: "Lorem Ipsum" },
//     ],
//   },
//   {
//     title: "Disability Details(2)",
//     details: [
//       { title: "Name", value: "Lorem Ipsum" },
//       { title: "Type", value: "Lorem Ipsum" },
//       { title: "Disability Since", value: "Lorem Ipsum" },
//       { title: "Disability Area", value: "Lorem Ipsum" },
//     ],
//   },
//   { title: "Applicant Occupation", value: "Lorem Ipsum" },
//   { title: "Personal Income", value: "Lorem Ipsum" },
// ];

// export const mapDivyang = (data, matches) => {
//   return data.map((item, index) => {
//     if (
//       item.title === "Applicant Occupation" ||
//       item.title === "Personal Income"
//     ) {
//       return (
//         <CustomBox key={index} matches={matches} width={"66%"}>
//           <CustomDataShower
//             title={item.title}
//             value={item.value}
//             matches={matches}
//             width={"50%"}
//           />
//         </CustomBox>
//       );
//     } else if (
//       item.title === "Disability Details(1)" ||
//       item.title === "Disability Details(2)"
//     ) {
//       return (
//         <React.Fragment key={index}>
//           <Grid item xs={12}>
//             <CustomTypography
//               capitalize={"capitalize"}
//               variant="h6"
//               style={{
//                 fontSize: "18px",
//                 display: "flex",
//                 justifyContent: matches ? "start" : "center",
//               }}
//               color={theme.palette.commonColor.black}
//             >
//               {item.title}
//             </CustomTypography>
//           </Grid>
//           <CustomBox matches={matches}>
//             {item.details.map((detail, idx) => (
//               <CustomDataShower
//                 key={idx}
//                 title={detail.title}
//                 value={detail.value}
//                 matches={matches}
//               />
//             ))}
//           </CustomBox>
//           <Grid item xs={12}>
//             <DividerLine gap={"8px 0 24px"} />
//           </Grid>
//         </React.Fragment>
//       );
//     } else {
//       return (
//         <React.Fragment key={index}>
//           <CustomBox matches={matches}>
//             <CustomDataShower
//               title={item.title}
//               value={item.value}
//               matches={matches}
//               width={item.width}
//             />
//           </CustomBox>
//           {console.log(item?.divider)}
//           {item.divider ? (
//             <Grid item xs={12}>
//               <DividerLine gap={"8px 0 24px"} />
//             </Grid>
//           ) : (
//             ""
//           )}
//         </React.Fragment>
//       );
//     }
//   });
// };
