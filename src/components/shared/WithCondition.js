import propTypes from "prop-types";

export const WithCondition = ({ children, isValid, nullComponent }) => {
  return isValid ? children : nullComponent || <></>;
};

WithCondition.propTypes = {
  nullComponent: propTypes.any,
  isValid: propTypes.oneOfType([
    propTypes.string,
    propTypes.bool,
    propTypes.number,
  ]),
  children: propTypes.any,
};
