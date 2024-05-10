import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  CustomTypography,
  StyledFormContainer,
  SubmitButton,
  theme,
} from "../../../styles";
import { DividerLine, DivyangDetail, ListTopbar } from "../../shared";

const Container = styled(Box)({
  height: 80,
  width: "89.8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginLeft: "5%",
});

const Close = styled(IconButton)(({ theme }) => ({
  color: theme?.palette?.commonColor?.white,
  fontSize: 24,
  position: "absolute",
  top: 10,
  right: 10,
}));

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

const CustomDataShower = ({ title, value, matches, width, onClick }) => {
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
      {onClick ? (
        <Box
          sx={{
            fontStyle: "italic",
            color: theme.palette?.commonColor?.barkBlue,
            textDecoration: "underline",
            marginBottom: "6px",
            cursor: "pointer",
            userSelect: "none",
            "&:active": {
              textDecoration: "none",
            },
          }}
          onClick={() => onClick()}
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

const MyProfile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Container>
        <ContainerAlign>
          <Title variant="h6"></Title>

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
      </Container> */}

      <ListTopbar
        label={"My Profile"}
        additionalComponent={
          <>
            <SubmitButton
              onClick={() =>
                navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL)
              }
            >
              Edit Profile
            </SubmitButton>

            <SubmitButton
              onClick={() =>
                navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL)
              }
            >
              Change Password
            </SubmitButton>
          </>
        }
      />

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
              title={"Voter ID"}
              onClick={() =>
                setOpen({
                  title: "Voter ID",
                  image: "",
                })
              }
              matches={`${matches}`}
            />
            <CustomDataShower
              title={"PAN Card"}
              onClick={() =>
                setOpen({
                  title: "PAN Card",
                  image:
                    "https://www.pdffiller.com/preview/244/69/244069077.png",
                })
              }
              matches={`${matches}`}
            />
            <CustomDataShower
              title={"Driving Lisence"}
              onClick={() =>
                setOpen({
                  title: "Driving Lisence",
                  image: "",
                })
              }
              matches={`${matches}`}
            />
            <CustomDataShower
              title={"Ration Card"}
              onClick={() =>
                setOpen({
                  title: "Ration Card",
                  image:
                    "https://www.pdffiller.com/preview/244/69/244069077.png",
                })
              }
              matches={`${matches}`}
            />
          </CustomBox>

          <CustomBox matches={`${matches}`}>
            <CustomDataShower
              title={"Aadhar Card"}
              onClick={() =>
                setOpen({
                  title: "Aadhar Card",
                  image: "",
                })
              }
              matches={`${matches}`}
            />
            <CustomDataShower
              title={"Pension Card"}
              onClick={() =>
                setOpen({
                  title: "Pension Card",
                  image: "",
                })
              }
              matches={`${matches}`}
            />
            <CustomDataShower
              title={"Medical Insurance Card"}
              onClick={() =>
                setOpen({
                  title: "Medical Insurance Card",
                  image:
                    "https://www.pdffiller.com/preview/244/69/244069077.png",
                })
              }
              matches={`${matches}`}
            />
            <CustomDataShower
              title={"Disability Scheme No"}
              onClick={() =>
                setOpen({
                  title: "Disability Scheme No",
                  image: "",
                })
              }
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
          {/* {mapDivyang(divayangDetail(), matches)} */}

          {open ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                scrollbarWidth: "thin",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "24px",
                }}
                onClick={() => setOpen(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <CustomTypography
                    capitalize={"capitalize"}
                    variant="h6"
                    style={{
                      fontSize: "24px",
                    }}
                    color={theme.palette.commonColor.white}
                  >
                    {open?.title}
                  </CustomTypography>
                  <Close onClick={() => setOpen(false)}>
                    <CloseIcon sx={{ fontSize: 30 }} />
                  </Close>
                </Box>
                <img
                  src={open?.image}
                  alt="img"
                  style={{
                    width: matches
                      ? "32%"
                      : matchesMd
                      ? "40%"
                      : matchesSm
                      ? "56%"
                      : "74%",
                    aspectRatio: 1 / 1.41,
                    objectPosition: "center",
                    objectFit: open?.image ? "cover" : "contain",
                    borderRadius: "4px",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    position: "relative",
                    display: "block",
                    margin: "auto",
                    userSelect: "none",
                    background: "white",
                  }}
                  onClick={(e) => {
                    !!open?.image && e.stopPropagation();
                  }}
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </StyledFormContainer>
      </Grid>
    </>
  );
};

export default MyProfile;
