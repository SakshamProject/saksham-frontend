import React from "react";

import { ROUTE_PATHS } from "../../../routes/routePaths";
import { FormWrapper } from "../../shared";

const Form = () => {
  return (
    <FormWrapper
      title="Service Mapping"
      navigateTo={ROUTE_PATHS?.SERVICE_MAPPING_LIST}
      disableModes
    ></FormWrapper>
  );
};

export default Form;
