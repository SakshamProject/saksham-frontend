import { styled } from "@mui/material";
import propTypes from "prop-types";
import defaultAvatar from "../../assets/avatar.png";
import { CommonAvatar } from "../../styles";
import CustomTooltip from "./CustomTooltip";

const ProfileNameAvatar = styled(CommonAvatar)(({ theme }) => ({
  cursor: "pointer",
  color: theme?.palette?.commonColor?.white,
  backgroundColor: theme?.palette?.primary?.light,
}));

export const UserProfile = ({ userInfo, style }) => {
  const userName = userInfo?.name?.split(" ") || [];
  let firstCharacter = "";

  for (let i = 0; i < Math.min(userName.length, 2); i++) {
    firstCharacter += userName[i][0] || "";
  }
  firstCharacter = firstCharacter.toUpperCase();

  return (
    <CustomTooltip title={"My Profile"}>
      {userInfo?.profileUrl ? (
        <CommonAvatar
          style={{ cursor: "pointer", ...style }}
          src={userInfo?.profileUrl || defaultAvatar}
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
          alt={firstCharacter || "Profile"}
        />
      ) : (
        <ProfileNameAvatar style={{ ...style }}>
          {firstCharacter}
        </ProfileNameAvatar>
      )}
    </CustomTooltip>
  );
};

UserProfile.propTypes = {
  userInfo: propTypes.object,
  style: propTypes.object,
};
