import React from "react";
import { CustomReactTable, ListTopbar } from "../../../shared";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";

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
        label={"Seva Kendra Master"}
        newFormPath={ROUTE_PATHS?.SEVA_KENDRA_MASTER_FORM}
        listPath={ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST}
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
