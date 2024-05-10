import propTypes from "prop-types";
import defaultAvatar from "../../assets/avatar.png";
import { CommonAvatar } from "../../styles";
import CustomTooltip from "./CustomTooltip";

export const UserProfile = ({ userInfo, style, placement }) => (
  <CustomTooltip title={"profile"} placement={placement}>
    <CommonAvatar
      style={style}
      src={userInfo?.profileImg || defaultAvatar}
      onError={(e) => (e.target.src = defaultAvatar)}
      alt="profile"
    />
  </CustomTooltip>
);

UserProfile.propTypes = {
  userInfo: propTypes.any,
  placement: propTypes.string,
  style: propTypes.object,
};
