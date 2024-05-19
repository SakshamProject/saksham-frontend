import propTypes from "prop-types";
import defaultAvatar from "../../assets/avatar.png";
import { CommonAvatar } from "../../styles";
import { WithCondition } from "./WithCondition";

export const UserProfile = ({ userInfo, style, placement }) => {
  const userName = userInfo?.name?.split(" ") || [];
  let firstCharacter = "";

  for (let i = 0; i < Math.min(userName.length, 2); i++) {
    firstCharacter += userName[i][0] || "";
  }
  firstCharacter = firstCharacter.toUpperCase();

  return (
    <WithCondition
      isValid={!!userInfo?.profileUrl}
      nullComponent={<CommonAvatar>{firstCharacter}</CommonAvatar>}
    >
      <CommonAvatar
        style={style}
        src={userInfo?.profileUrl || defaultAvatar}
        onError={(e) => (e.target.src = defaultAvatar)}
        alt="profile"
      />
    </WithCondition>
  );
};

UserProfile.propTypes = {
  userInfo: propTypes.object,
  placement: propTypes.string,
  style: propTypes.object,
};
