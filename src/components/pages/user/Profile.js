import { Edit } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { Box, IconButton, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicUserImg from "../../../assets/profile.png";
import { CODES } from "../../../constants/globalConstants";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { WithCondition } from "../../shared";

const Title = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.commonColor?.black,
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.3rem",
  margin: "30px 0",
}));

const FormContainer = styled("div")({
  margin: "0 30px",
});

const SubFormContainer = styled("div")(({ theme }) => ({
  padding: "30px",
  margin: "20px 0",
  width: "65%",
  border: `1px solid ${theme.palette?.shadowColor?.main}`,
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    margin: "20px auto",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "20px auto",
    width: "80%",
  },
}));

const Image = styled("img")(({ theme }) => ({
  height: "130px",
  width: "130px",
  borderRadius: "50%",
  [theme.breakpoints.down("md")]: {
    height: "100px",
    width: "100px",
  },
}));

const ProfileDetails = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
}));

const IconContainer = styled(IconButton)(({ theme }) => ({
  borderRadius: "2px",
  padding: "8px ",
}));

const GeneralContainer = styled(Box)(({ theme }) => ({
  width: "auto",
  display: "flex",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));

const RoleContainer = styled("div")(({ theme }) => ({
  marginTop: "10px",
  borderRadius: "4px",
  width: "max-content",
  padding: "5px 10px",
  background: theme.palette?.primary?.main,
  color: theme?.palette?.primary?.contrastText,
  cursor: "pointer",
}));

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInfo);

  const changePassword = () => {
    navigate(ROUTE_PATHS.CHANGE_PASSWORD);
  };

  return (
    <FormContainer>
      <Title>PROFILE</Title>
      <SubFormContainer>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <GeneralContainer>
            <Image
              src={userInfo?.profileImageUrl || BasicUserImg}
              onError={(e) => {
                e.currentTarget.src = BasicUserImg;
              }}
              alt="user profile"
            />
          </GeneralContainer>

          <GeneralContainer sx={{ flex: 1 }}>
            <ProfileDetails>
              <Typography
                textTransform={"uppercase"}
                fontSize={20}
                sx={{ cursor: "pointer" }}
              >
                {userInfo?.name || "User"}
              </Typography>

              <WithCondition isValid={!!userInfo?.designation?.name}>
                <RoleContainer>{userInfo?.designation?.name}</RoleContainer>
              </WithCondition>
            </ProfileDetails>
          </GeneralContainer>

          <GeneralContainer>
            <IconContainer
              onClick={() => navigate(ROUTE_PATHS?.PROFILE)}
              disabled={userInfo?.role !== CODES?.SEVA_KENDRA}
            >
              <Edit />
            </IconContainer>

            <IconContainer
              onClick={changePassword}
              disabled={userInfo?.role !== CODES?.SEVA_KENDRA}
            >
              <LockIcon />
            </IconContainer>
          </GeneralContainer>
        </Box>
      </SubFormContainer>
    </FormContainer>
  );
};

export default Profile;
