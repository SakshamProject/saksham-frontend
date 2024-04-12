import { useQuery } from "@tanstack/react-query";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CommonList, CustomReactTable, ListTopbar } from "../../shared";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService, postApiService } from "../../../api/api";
import { serviceMasterColumn } from "../../../constants/serviceMaster/serviceMaster";
import useTableCustomHooks from "../../../hooks/useTableCustomHooks";
import { getTableSchemas } from "../../../utils/tableSchemas";

const List = () => {
  const { filterFields, filterInitialValues } =
    getTableSchemas(serviceMasterColumn);

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
      postApiService(API_PATHS?.SERVICES_LIST, {
        pagination: { rows: pageSize, start: pageSize * (currentPage - 1) + 1 },
        search: searchData ? searchData : "",
        sorting: { orderByColumn: "createdAt", sortOrder: "desc" },
        // filters: filterData?.length !== 0 ? filterData : [],
      }),
    select: ({ data }) => data,
  });

  return (
    <>
      <ListTopbar
        label={"Services"}
        listPath={ROUTE_PATHS?.SERVICE_MASTER_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />

      <CustomReactTable
        columnData={serviceMasterColumn || []}
        rawData={dataList?.services || []}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={dataList?.total}
      />
      {/* <CommonList
        label={"Services"}
        listPath={"SERVICE_MASTER_LIST"}
        customApiPath={`${API_PATHS?.SERVICES_LIST}`}
        columns={serviceMasterColumn}
        dataAccessor={"services"}
      /> */}
    </>
  );
};

export default List;
