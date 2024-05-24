import { Edit, Lock } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userProfile from "../../../assets/profile.png";
import { CODES } from "../../../constants/globalConstants";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  FormContainer,
  GeneralContainer,
  IconContainer,
  Image,
  ProfileCard,
  ProfileDetails,
  RoleContainer,
  SubFormContainer,
  Title,
} from "../../../styles/profile";

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInfo);

  return (
    <FormContainer>
      <Title>PROFILE</Title>

      <SubFormContainer>
        <ProfileCard>
          <GeneralContainer>
            <Image
              src={userInfo?.profileImageUrl || userProfile}
              onError={(e) => {
                e.currentTarget.src = userProfile;
              }}
              alt="user profile"
            />
          </GeneralContainer>

          <GeneralContainer sx={{ flex: 1 }}>
            <ProfileDetails>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: 20,
                  textTransform: "uppercase",
                }}
              >
                {userInfo?.name || userInfo?.person?.name || "Anonymous"}
              </Typography>

              <RoleContainer>
                {userInfo?.designation?.name || userInfo?.role || "Unknown"}
              </RoleContainer>
            </ProfileDetails>
          </GeneralContainer>

          <GeneralContainer>
            <IconContainer
              onClick={() => navigate(ROUTE_PATHS?.PROFILE)}
              disabled={userInfo?.role === CODES?.ADMIN}
            >
              <Edit />
            </IconContainer>

            <IconContainer
              onClick={() => navigate(ROUTE_PATHS.CHANGE_PASSWORD)}
              disabled={userInfo?.role === CODES?.ADMIN}
            >
              <Lock />
            </IconContainer>
          </GeneralContainer>
        </ProfileCard>
      </SubFormContainer>
    </FormContainer>
  );
};

export default Profile;
