import propTypes from "prop-types";
import defaultAvatar from "../../assets/avatar.png";
import { CommonAvatar } from "../../styles";
import CustomTooltip from "./CustomTooltip";

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
          style={{ ...style, cursor: "pointer" }}
          src={userInfo?.profileUrl || defaultAvatar}
          onError={(e) => (e.target.src = defaultAvatar)}
          alt="profile"
        />
      ) : (
        <CommonAvatar style={{ cursor: "pointer" }}>
          {firstCharacter}
        </CommonAvatar>
      )}
    </CustomTooltip>
  );
};

UserProfile.propTypes = {
  userInfo: propTypes.object,
  style: propTypes.object,
};
