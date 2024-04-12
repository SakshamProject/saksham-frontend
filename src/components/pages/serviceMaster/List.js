import { useQuery } from "@tanstack/react-query";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CommonList, CustomReactTable, ListTopbar } from "../../shared";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService } from "../../../api/api";
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

  // const {
  //   data: dataList,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["getAllServices", currentPage, searchData],
  //   queryFn: () =>
  //     getApiService(
  //       `${API_PATHS?.SERVICES}?orderBy=serviceName${
  //         !!searchData ? `&searchText=${searchData}` : ""
  //       }`
  //     ),
  //   select: ({ data }) => data,
  // });

  return (
    <>
      {/* <ListTopbar
        label={"Services"}
        listPath={ROUTE_PATHS?.SERVICE_MASTER_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
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
      /> */}
      <CommonList
        label={"Services"}
        listPath={"SERVICE_MASTER_LIST"}
        formPath={"SERVICE_MASTER_FORM"}
        customApiPath={`${API_PATHS?.SERVICES_LIST}`}
        columns={serviceMasterColumn}
        dataAccessor={"services"}
      />
    </>
  );
};

export default List;
