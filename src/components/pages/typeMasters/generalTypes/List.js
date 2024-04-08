import { CommonList } from "../../../shared";

const List = () => {
  return (
    <CommonList
      label="General Type"
      listPath={"GENERAL_TYPES_LIST"}
      formPath={"GENERAL_TYPES_FORM"}
      apiPath={"list"}
      columns={[]}
      disableFilter
      disableSearchField
    />
  );
};

export default List;
