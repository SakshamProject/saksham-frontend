import { Box, Grid, Typography, styled, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { divyangDetailsColumn } from "../../../constants/divyangDetails/divyangDetails";
import { CommonList, DividerLine, DivyangDetail } from "../../shared";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CustomTypography, StyledFormContainer, theme } from "../../../styles";
import { useTheme } from "@mui/material/styles";

const Container = styled(Box)({
  height: 80,
  width: "89.8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginLeft: "5%",
});

const ContainerAlign = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.commonColor?.black,
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.3rem",
}));

const IconsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const NewButton = styled(Box)(({ theme }) => ({
  borderRadius: "4px",
  marginLeft: 14,
  padding: "7px 10px",
  border: `1px solid ${theme.palette?.commonColor?.black}`,
  borderColor: theme.palette?.commonColor?.black,
  backgroundColor: theme.palette?.commonColor?.lightGrey,
  cursor: "pointer",
  color: theme.palette?.commonColor?.black,
  "&:hover": {
    border: `1px solid ${theme.palette?.commonColor?.black}`,
    backgroundColor: theme.palette?.commonColor?.lightGrey,
    opacity: 0.95,
  },
}));

const CustomBox = styled(Box)(({ theme, matches, width }) => ({
  display: "flex",
  flexDirection: matches === "true" ? "row" : "column",
  justifyContent: matches === "true" ? "space-between" : "center",
  width: matches === "true" ? width || "100%" : "100%",
}));

const CustomDataShower = ({ title, value, link, matches, width }) => {
  return (
    <Box
      sx={{
        marginBottom: "8px",
        display: "flex",
        alignItems: matches === "true" ? "start" : "center",
        flexDirection: "column",
        width: matches === "true" ? width || "25%" : "100%",
      }}
    >
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "6px",
        }}
      >
        {title}
      </Box>
      {link ? (
        <Box
          sx={{
            fontStyle: "italic",
            color: theme.palette?.commonColor?.barkBlue,
            textDecoration: "underline",
            marginBottom: "6px",
          }}
        >
          View File
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: "15px",
            marginBottom: "6px",
          }}
        >
          {value}
        </Box>
      )}
    </Box>
  );
};

const List = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {1 === 2 ? (
        <CommonList
          label={"Divyang Details"}
          listPath={"DIVYANG_DETAILS_LIST"}
          formPath={"DIVYANG_DETAILS_FORM_PERSONAL"}
          apiPath={"DIVYANG_DETAILS_LIST"}
          columns={divyangDetailsColumn}
        />
      ) : (
        <>
          <Container>
            <ContainerAlign>
              <Title variant="h6">My Profile</Title>

              <IconsContainer>
                <NewButton
                  onClick={() =>
                    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL)
                  }
                >
                  Edit Profile
                </NewButton>
                <NewButton
                  onClick={() =>
                    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL)
                  }
                >
                  Change Password
                </NewButton>
              </IconsContainer>
            </ContainerAlign>
          </Container>
          <Grid container direction={"column"} width={"100%"}>
            <StyledFormContainer width="89.8%">
              <Grid item xs={12}>
                <DivyangDetail />
              </Grid>

              <Grid item xs={12}>
                <DividerLine gap={"8px 0 24px"} />
              </Grid>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"DOB"}
                  value={"1/1/93"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Mail ID"}
                  value={"Lorem@gmail.com"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Mobile No"}
                  value={"9876543210"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Blood Group"}
                  value={"B +ve"}
                  matches={`${matches}`}
                />
              </CustomBox>

              <Grid item xs={12}>
                <DividerLine gap={"8px 0 24px"} />
              </Grid>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"Permanent Address"}
                  value={
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                  }
                  width={"100%"}
                  matches={`${matches}`}
                />
              </CustomBox>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"Temporary Address"}
                  value={
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                  }
                  width={"100%"}
                  matches={`${matches}`}
                />
              </CustomBox>

              <Grid item xs={12}>
                <DividerLine gap={"8px 0 24px"} />
              </Grid>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"Votet ID"}
                  link={" "}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"PAN Card"}
                  link={" "}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Driving Lisence"}
                  link={" "}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Ration Card"}
                  link={" "}
                  matches={`${matches}`}
                />
              </CustomBox>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"Aadhar Card"}
                  link={" "}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Pension Card"}
                  link={" "}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Medical Insurance Card"}
                  link={" "}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Disability Scheme No"}
                  link={" "}
                  matches={`${matches}`}
                />
              </CustomBox>

              <Grid item xs={12}>
                <DividerLine gap={"8px 0 24px"} />
              </Grid>

              <Grid item xs={12}>
                <CustomTypography
                  capitalize={"capitalize"}
                  variant="h6"
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: matches ? "start" : "center",
                  }}
                  color={theme.palette.commonColor.black}
                >
                  Disability Details(1)
                </CustomTypography>
              </Grid>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"Name"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Type"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Disability Since"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Disability Area"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
              </CustomBox>

              <Grid item xs={12}>
                <CustomTypography
                  capitalize={"capitalize"}
                  variant="h6"
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: matches ? "start" : "center",
                  }}
                  color={theme.palette.commonColor.black}
                >
                  Disability Details(2)
                </CustomTypography>
              </Grid>

              <CustomBox matches={`${matches}`}>
                <CustomDataShower
                  title={"Name"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Type"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Disability Since"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
                <CustomDataShower
                  title={"Disability Area"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                />
              </CustomBox>

              <Grid item xs={12}>
                <DividerLine gap={"8px 0 24px"} />
              </Grid>

              <CustomBox matches={`${matches}`} width={"66%"}>
                <CustomDataShower
                  title={"Applicant Occupation"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                  width={"50%"}
                />
                <CustomDataShower
                  title={"Personal Income"}
                  value={"Lorem Ipsum"}
                  matches={`${matches}`}
                  width={"50%"}
                />
              </CustomBox>
            </StyledFormContainer>
          </Grid>
        </>
      )}
    </>
  );
};

export default List;
