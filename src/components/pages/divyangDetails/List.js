import { useSelector } from "react-redux";
import { divyangDetailsColumn } from "../../../constants/divyangDetails/divyangDetails";
import { CommonList } from "../../shared";
import { CODES } from "../../../constants/globalConstants";

const List = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  return (
    <CommonList
      label={"Divyang Details"}
      listPath={"DIVYANG_DETAILS_LIST"}
      formPath={"DIVYANG_DETAILS_FORM_PERSONAL"}
      apiPath={"DIVYANG_DETAILS_LIST"}
      columns={divyangDetailsColumn(
        !userInfo?.diviyangDetails && userInfo?.role === CODES?.SEVA_KENDRA
      )}
      disableNewForm={
        !userInfo?.diviyangDetails && userInfo?.role === CODES?.SEVA_KENDRA
      }
    />
  );
};

export default List;
