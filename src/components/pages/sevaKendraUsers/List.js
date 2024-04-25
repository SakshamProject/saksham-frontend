import { sevakendraUsersColumn } from "../../../constants/sevaKendraUsers/sevaKendraUsers";
import { CommonList } from "../../shared";

const List = () => {
  return (
    <CommonList
      label={"Seva Kendra Users"}
      listPath={"SEVA_KENDRA_USERS_LIST"}
      formPath={"SEVA_KENDRA_USERS_FORM"}
      apiPath={"SEVAKENDRA_USERS_LIST"}
      columns={sevakendraUsersColumn}
    />
  );
};

export default List;
