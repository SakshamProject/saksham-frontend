import { sevakendraColumn } from "../../../../constants/sevaKendraSetup/master";
import { CommonList } from "../../../shared";

const List = () => {
  return (
    <CommonList
      label={"Seva Kendra Master"}
      listPath={"SEVA_KENDRA_MASTER_LIST"}
      formPath={"SEVA_KENDRA_MASTER_FORM"}
      apiPath={"SEVAKENDRA_LIST"}
      columns={sevakendraColumn}
    />
  );
};

export default List;
