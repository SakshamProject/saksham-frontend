import { useQuery } from "@tanstack/react-query";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CustomReactTable, ListTopbar } from "../../shared";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService } from "../../../api/api";
import { serviceMasterColumn } from "../../../constants/serviceMaster/serviceMaster";
import useTableCustomHooks from "../../../hooks/useTableCustomHooks";

const List = () => {
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS.SERVICE_MASTER_LIST);

  const { pageSize, currentPage, searchData } = tableReRenderActions();

  const {
    data: dataList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllServices", currentPage, searchData],
    queryFn: () =>
      getApiService(
        `${API_PATHS?.SERVICES}?orderBy=serviceName${
          !!searchData ? `&searchText=${searchData}` : ""
        }`
      ),
    select: ({ data }) => data,
  });

  return (
    <>
      <ListTopbar
        label={"Services"}
        listPath={ROUTE_PATHS?.SERVICE_MASTER_LIST}
        // filterFields={filterFields}
        // isFilterParams={!!listParams?.filters?.length}
      />

      <CustomReactTable
        columnData={serviceMasterColumn || []}
        rawData={dataList?.data || []}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={dataList?.total}
      />
    </>
  );
};

export default List;
