import { divyangDetailsColumn } from "../../../constants/divyangDetails/divyangDetails";
import { CommonList } from "../../shared";

const List = () => {
  return (
    <CommonList
      label={"Divyang Details"}
      listPath={"DIVYANG_DETAILS_LIST"}
      formPath={"DIVYANG_DETAILS_FORM_PERSONAL"}
      apiPath={"DIVYANG_DETAILS_LIST"}
      columns={divyangDetailsColumn}
    />
  );
};

export default List;
