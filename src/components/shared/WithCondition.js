import propTypes from "prop-types";

export const WithCondition = ({ children, isValid, nullComponent }) => {
  return isValid ? children : nullComponent || <></>;
};

WithCondition.propTypes = {
  children: propTypes.any,
  isValid: propTypes.bool,
  nullComponent: propTypes.any,
};
