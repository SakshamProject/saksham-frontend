import { useSelector } from "react-redux";
import { API_PATHS } from "../../../../api/apiPaths";
import { columns } from "../../../../constants/divyang/services";
import { CommonList } from "../../../shared";

const List = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  return (
    <CommonList
      label={"My Services"}
      listPath={"DIVYANG_SERVICES_LIST"}
      formPath={"DIVYANG_SERVICES_FORM"}
      customApiPath={`${API_PATHS?.DIVYANG_DETAILS}/${userInfo?.userId}${API_PATHS?.SERVICE}`}
      columns={columns}
    />
  );
};

export default List;
