import { columns } from "../../../../constants/sevaKendraSetup/designation";
import { CommonList } from "../../../shared";

const List = () => {
  return (
    <CommonList
      label={"Destinations"}
      listPath={"DESIGNATIONS_LIST"}
      formPath={"DESIGNATIONS_FORM"}
      apiPath={"DESIGNATION_LIST"}
      columns={columns}
      disableSortingPayload
    />
  );
};

export default List;
