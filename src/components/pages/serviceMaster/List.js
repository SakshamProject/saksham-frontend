import { serviceMasterColumn } from "../../../constants/serviceMaster/serviceMaster";
import useResponsive from "../../../hooks/useResponsive";
import { CommonList } from "../../shared";

const List = () => {
  const { isMobile } = useResponsive();

  return (
    <CommonList
      label={"Services"}
      listPath={"SERVICE_MASTER_LIST"}
      apiPath={"SERVICES_LIST"}
      columns={serviceMasterColumn}
      style={{
        ...(isMobile && {
          ".searchField": {
            margin: 0,
            width: "100%",
          },
        }),
      }}
    />
  );
};

export default List;
