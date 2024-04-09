import { useQuery } from "@tanstack/react-query";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CustomReactTable, ListTopbar } from "../../shared";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService } from "../../../api/api";
import { serviceMasterColumn } from "../../../constants/serviceMaster/serviceMaster";

const List = () => {
  const {
    data: dataList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllServices"],
    queryFn: () => getApiService(`${API_PATHS?.SERVICES}?orderBy=serviceName`),
    select: ({ data }) => data,
  });

  return (
    <>
      <ListTopbar
        label={"Services" || ""}
        newFormPath={ROUTE_PATHS?.SERVICE_MASTER_FORM}
        listPath={ROUTE_PATHS?.SERVICE_MASTER_LIST}
        // filterFields={filterFields}
        // isFilterParams={!!listParams?.filters?.length}
      />

      <CustomReactTable
        columnData={serviceMasterColumn || []}
        rawData={dataList?.data || []}
        isLoading={isLoading}
        count={dataList?.total}
      />
    </>
  );
};

export default List;
