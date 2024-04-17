import { generalTypeColumns } from "../../../../constants/typeMasters/generalTypes";
import { CommonList } from "../../../shared";

const List = () => {
  return (
    <CommonList
      label={"General Type"}
      listPath={"GENERAL_TYPES_LIST"}
      formPath={"GENERAL_TYPES_FORM"}
      apiPath={"GENERAL_MASTER_SEED"}
      columns={generalTypeColumns}
      isGetApi
      disableFilters
      disableSearchField
      // disablePagination
      disableColumnHiding
      manualSort
    />
  );
};

export default List;
