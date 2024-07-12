import { Edit, Lock } from "@mui/icons-material";
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
  UserName,
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
              src={userInfo?.profileUrl || userProfile}
              onError={(e) => {
                e.currentTarget.src = userProfile;
              }}
              alt="user profile"
            />
          </GeneralContainer>

          <GeneralContainer sx={{ flex: 1 }}>
            <ProfileDetails>
              <UserName>
                {userInfo?.name || userInfo?.person?.name || "Anonymous"}
              </UserName>

              <RoleContainer>
                {userInfo?.designation?.name || userInfo?.role || "Unknown"}
              </RoleContainer>
            </ProfileDetails>
          </GeneralContainer>

          <GeneralContainer>
            <IconContainer
              onClick={() => {
                navigate(ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM, {
                  state: {
                    editId: userInfo?.userId,
                    backPath: ROUTE_PATHS.PROFILE,
                  },
                });
              }}
              disabled={userInfo?.role !== CODES?.SEVA_KENDRA}
            >
              <Edit />
            </IconContainer>

            <IconContainer
              onClick={() => navigate(ROUTE_PATHS?.CHANGE_PASSWORD)}
              disabled={userInfo?.role !== CODES?.SEVA_KENDRA}
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
