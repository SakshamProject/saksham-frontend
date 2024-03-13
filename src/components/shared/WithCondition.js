import React from "react";

export const WithCondition = ({ children, isValid, nullComponent = <></> }) => {
  return !!isValid ? children : nullComponent;
};
