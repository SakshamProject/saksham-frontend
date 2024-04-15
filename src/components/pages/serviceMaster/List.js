import { serviceMasterColumn } from "../../../constants/serviceMaster/serviceMaster";
import { CommonList } from "../../shared";

const List = () => {
  // const { filterFields, filterInitialValues } =
  //   getTableSchemas(serviceMasterColumn);

  // const {
  //   onPageNumberChange,
  //   onChangePageSize,
  //   handleTableDatas,
  //   tableReRenderActions,
  // } = useTableCustomHooks(ROUTE_PATHS.SERVICE_MASTER_LIST);

  // const { pageSize, currentPage, searchData } = tableReRenderActions();

  // const {
  //   data: dataList,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["getAllServices", currentPage, searchData],
  //   queryFn: () =>
  //     postApiService(API_PATHS?.SERVICES_LIST, {
  //       pagination: { rows: pageSize, start: pageSize * (currentPage - 1) + 1 },
  //       search: searchData ? searchData : "",
  //       sorting: { orderByColumn: "createdAt", sortOrder: "desc" },
  //       // filters: filterData?.length !== 0 ? filterData : [],
  //     }),
  //   select: ({ data }) => data,
  // });

  // return (
  //   <>
  //     <ListTopbar
  //       label={"Services"}
  //       listPath={ROUTE_PATHS?.SERVICE_MASTER_LIST}
  //       filterFields={filterFields}
  //       filterFieldInitial={filterInitialValues}
  //     />

  //     <CustomReactTable
  //       columnData={serviceMasterColumn || []}
  //       rawData={dataList?.services || []}
  //       isLoading={isLoading}
  //       onPageNumberChange={onPageNumberChange}
  //       onChangePageSize={onChangePageSize}
  //       pageSize={pageSize}
  //       currentPage={currentPage}
  //       count={dataList?.total}
  //     />

  //   </>
  // );

  return (
    <CommonList
      label={"Services"}
      listPath={"SERVICE_MASTER_LIST"}
      formPath={"SERVICE_MASTER_FORM"}
      apiPath={"SERVICES_LIST"}
      columns={serviceMasterColumn}
    />
  );
};

export default List;
