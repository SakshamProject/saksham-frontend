import React from "react";

import { ROUTE_PATHS } from "../../../routes/routePaths";
import { FormWrapper } from "../../shared";

const Form = () => {
  return (
    <FormWrapper
      title="Divyang"
      navigateTo={ROUTE_PATHS?.DIVYANG_DETAILS_LIST}
      columnSpacing={3}
    ></FormWrapper>
  );
};

export default Form;
