import { serviceMasterColumn } from "../../../constants/serviceMaster/serviceMaster";
import { CommonList } from "../../shared";

const List = () => {
  return (
    <CommonList
      label={"Services"}
      listPath={"SERVICE_MASTER_LIST"}
      apiPath={"SERVICES_LIST"}
      columns={serviceMasterColumn}
    />
  );
};

export default List;
