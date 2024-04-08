import React from "react";
import { CommonList } from "../../../shared";

const List = () => {
  return (
    <CommonList
      label="Seva Kendra Master"
      listPath={"SEVA_KENDRA_MASTER_LIST"}
      formPath={"SEVA_KENDRA_MASTER_FORM"}
      // apiPath={"EMPLOYEE_TRANSACTIONS"}
      // columns={columns}
    />
  );
};

export default List;
