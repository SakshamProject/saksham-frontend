import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, styled, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getByIdApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import fileNotFound from "../../../assets/fileNotFound.png";
import {
  communicationAddress,
  divyangBasicDetails,
  divyangFilesDetail,
  permanentAddress,
} from "../../../constants/divyang/profile";
import { getFilesUrl } from "../../../constants/divyangDetails/personalDetails";
import useResponsive from "../../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  CustomTypography,
  StyledFormContainer,
  SubmitButton,
  theme,
} from "../../../styles";
import { scrollbarStyle } from "../../../styles/scrollbarStyle";
import {
  DividerLine,
  DivyangDetail,
  ListTopbar,
  WithCondition,
} from "../../shared";

const Close = styled(IconButton)(({ theme }) => ({
  color: theme?.palette?.commonColor?.white,
  fontSize: 24,
  position: "absolute",
  top: 10,
  right: 10,
}));

const CustomBox = styled(Box)(({ matches, width }) => ({
  display: "flex",
  flexDirection: matches === "true" ? "row" : "column",
  justifyContent: matches === "true" ? "space-between" : "center",
  width: matches === "true" ? width || "100%" : "100%",
}));

const ProfileWrapper = styled(Box)({
  height: "calc(100vh - 150px)",
  overflow: "auto",
  ...scrollbarStyle(true),
});

const FileModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  transform: "translate(-50%, -50%)",
  zIndex: 1500,
  backgroundColor: theme.palette?.shadowColor?.dark,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "auto",
  ...scrollbarStyle(true),
}));

const FileWrapper = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "24px",
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

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInfo);
  const { theme } = useResponsive();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);

  const { data: divyangDetails } = useQuery({
    queryKey: ["divyangDetails", userInfo],
    queryFn: () =>
      getByIdApiService(API_PATHS?.DIVYANG_DETAILS, userInfo?.userId),
    enabled: !!userInfo?.userId,
    select: ({ data }) => {
      return {
        ...data,
        data: {
          ...data?.data,
          state: data?.data?.district?.state,
        },
      };
    },
  });

  const { data, files, disabilityCards } = divyangDetails || {};
  const divyangFilesUrl = {};

  const FileImage = styled("img")(() => ({
    width: matches ? "32%" : matchesMd ? "40%" : matchesSm ? "56%" : "74%",
    aspectRatio: 1 / 1.41,
    objectPosition: "center",
    objectFit: open?.image ? "cover" : "contain",
    borderRadius: "4px",
    boxShadow: `0px 0px 10px 0px ${theme.palette?.shadowColor?.main} `,
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    position: "relative",
    display: "block",
    margin: "auto",
    userSelect: "none",
    background: "white",
  }));

  return (
    <>
      <ListTopbar
        label={"My Profile"}
        disableFilter
        disableNewForm
        disableSearchField
        additionalComponent={
          <>
            <SubmitButton
              onClick={() =>
                navigate(
                  {
                    pathname: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
                    search: `?${createSearchParams({ action: "edit" })}`,
                  },
                  {
                    state: {
                      viewDetails: false,
                      editId: userInfo?.userId,
                    },
                  },
                )
              }
              style={{ margin: 0 }}
            >
              Edit Profile
            </SubmitButton>

            <SubmitButton
              onClick={() => navigate(ROUTE_PATHS?.CHANGE_PASSWORD)}
              style={{
                margin: 0,
                marginLeft: "16px",
              }}
            >
              Change Password
            </SubmitButton>
          </>
        }
      />

      <ProfileWrapper>
        <Grid container direction={"column"} width={"100%"}>
          <StyledFormContainer width="100% !important">
            <Grid item xs={12}>
              <DivyangDetail
                divyangDetail={{
                  ...data,
                  ...divyangFilesUrl,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"16px 0px 20px"} />
            </Grid>

            <CustomBox matches={`${matches}`}>
              {divyangBasicDetails?.map((item) => (
                <CustomDataShower
                  key={item?.label}
                  title={item?.label}
                  value={
                    item?.cell
                      ? item.cell({ value: data?.[item?.accessor] }) || "--"
                      : data?.[item?.accessor] || "--"
                  }
                  matches={`${matches}`}
                />
              ))}
            </CustomBox>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <CustomBox matches={`${matches}`}>
              <CustomDataShower
                title={"Permanent Address"}
                value={getAddress(data, permanentAddress) || "--"}
                width={"100%"}
                matches={`${matches}`}
              />
            </CustomBox>

            <CustomBox matches={`${matches}`}>
              <CustomDataShower
                title={"Communication Address"}
                value={getAddress(data, communicationAddress) || "--"}
                width={"100%"}
                matches={`${matches}`}
              />
            </CustomBox>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <CustomBox matches={`${matches}`} sx={{ flexWrap: "wrap" }}>
              {divyangFilesDetail?.map((item) => (
                <CustomDataShower
                  key={item?.title}
                  title={item?.title}
                  onClick={() =>
                    setOpen({
                      title: item?.title,
                      image: divyangFilesUrl?.[item?.image] || fileNotFound,
                    })
                  }
                  matches={`${matches}`}
                />
              ))}
            </CustomBox>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            {/* <Grid item xs={12}>
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
              <DividerLine gap={"8px 0 24px"} />
            </Grid> */}

            <CustomBox matches={`${matches}`} width={"66%"}>
              <CustomDataShower
                title={"Applicant Occupation"}
                value={data?.occupation || "--"}
                matches={`${matches}`}
                width={"50%"}
              />
              <CustomDataShower
                title={"Personal Income"}
                value={data?.income || "--"}
                matches={`${matches}`}
                width={"50%"}
              />
            </CustomBox>
          </StyledFormContainer>
        </Grid>
      </ProfileWrapper>

      <WithCondition isValid={!!open}>
        <FileModal>
          <FileWrapper onClick={() => setOpen(false)}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CustomTypography
                capitalize={"capitalize"}
                variant="h6"
                style={{ fontSize: "24px" }}
                color={theme.palette.commonColor.white}
              >
                {open?.title}
              </CustomTypography>
              <Close onClick={() => setOpen(false)}>
                <CloseIcon sx={{ fontSize: 30 }} />
              </Close>
            </Box>

            <FileImage
              src={open?.image || fileNotFound}
              alt="img"
              onError={(e) => e.target.value === fileNotFound}
              onClick={(e) => {
                !!open?.image && e.stopPropagation();
              }}
            />
          </FileWrapper>
        </FileModal>
      </WithCondition>
    </>
  );
};

export default Profile;

const getAddress = (data, addressKeys) => {
  if (!data || !addressKeys) return "";

  return addressKeys
    .map(
      (key) =>
        data[key] &&
        (typeof data[key] === "object" ? data[key]?.name : `${data[key]}`),
    )
    .filter(Boolean)
    .join(", ");
};
