import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { CustomReactTable, ListTopbar } from "../../../shared";

const List = () => {
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS.SEVA_KENDRA_MASTER_LIST);

  const { pageSize, currentPage, searchData } = tableReRenderActions();

  return (
    <>
      <ListTopbar
        label={"Designations"}
        newFormPath={ROUTE_PATHS?.DESIGNATIONS_FORM}
        listPath={ROUTE_PATHS?.DESIGNATIONS_LIST}
        // filterFields={filterFields}
        // isFilterParams={!!listParams?.filters?.length}
      />

      <CustomReactTable
        columnData={
          // serviceMasterColumn ||
          []
        }
        rawData={
          // dataList?.data ||
          []
        }
        // isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        // count={dataList?.total}
      />
    </>
  );
};

export default List;
