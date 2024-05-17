import propTypes from "prop-types";
import defaultAvatar from "../../assets/avatar.png";
import { CommonAvatar } from "../../styles";
import CustomTooltip from "./CustomTooltip";
import { WithCondition } from "./WithCondition";

export const UserProfile = ({ userInfo, style, placement }) => {
  const userName = userInfo?.name?.split(" ") || [];
  let firstCharacter = "";

  for (let i = 0; i < Math.min(userName.length, 2); i++) {
    firstCharacter += userName[i][0] || "";
  }

  return (
    <CustomTooltip title={"profile"} placement={placement}>
      <WithCondition
        isValid={!!userInfo?.profileUrl}
        nullComponent={
          <CommonAvatar>{firstCharacter?.toUpperCase()}</CommonAvatar>
        }
      >
        <CommonAvatar
          style={style}
          src={userInfo?.profileUrl || defaultAvatar}
          onError={(e) => (e.target.src = defaultAvatar)}
          alt="profile"
        />
      </WithCondition>
    </CustomTooltip>
  );
};

UserProfile.propTypes = {
  userInfo: propTypes.any,
  placement: propTypes.string,
  style: propTypes.object,
};
