import { useTheme } from "@mui/material";
import Table from "custom_react_table7";
import { Fragment } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { ListingContainer } from "../../styles";
import { parseQueryParams } from "../../utils/queryParams";

export const CustomReactTable = ({
  columnData,
  rawData,
  style,
  count,
  pageSize,
  currentPage,
  onPageNumberChange,
  onChangePageSize,
  disablePagination,
  disableColumnHiding,
  disableSort,
  disableRowSelection,
  selectedRows,
  isLoading,
  maxHeight,
  manualSort,
  pagination,
  disableLayout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const pageParams = parseQueryParams(location?.search);
  const theme = useTheme();

  const tableSortValues = (value) => {
    const sortValue = columnData?.reduce((acc, column) => {
      if (column?.accessor === value[0]?.id) {
        acc = {
          orderByColumn: column?.filterAccessor,
          sortOrder: value[0]?.desc ? "desc" : "asc",
        };
      }
      return acc;
    }, {});

    const data = {
      ...pageParams,
      sort: JSON.stringify(sortValue),
    };

    if (value?.length === 0) delete data?.sort;

    return navigate(
      {
        pathName: `${pathName}`,
        search: `?${createSearchParams({ ...data })}`,
      },
      { state: location.state || null }
    );
  };

  const Layout = disableLayout ? Fragment : ListingContainer;

  const tableStyle = {
    table: {
      maxHeight: maxHeight || "calc(100vh - 280px)",
      scrollbarWidth: "thin",
      scrollbarColor: `${theme?.palette?.scrollbarColor?.thumb} ${theme?.palette?.scrollbarColor?.track}`,
    },
    mainContainer: {
      maxWidth: "100%",
    },
    ".tableHead": {
      maxWidth: "100%",
      userSelect: "none",
      color: theme?.palette?.tableColor?.headerText,
    },
    ".css1kciki3 .tableHead": {
      backgroundColor: theme?.palette?.tableColor?.header,
    },
    th: {
      font: "normal normal bold 14px/19px sans-serif !important",
      display: "flex !important",
      height: "64px !important",
      backgroundColor: theme?.palette?.tableColor?.header,
      color: theme?.palette?.tableColor?.headerText,
    },
    body: {
      font: "normal normal normal 14px/19px sans-serif !important",
    },
    headerText: {
      overflow: "visible",
      userSelect: "none",
    },
    tr: {
      display: "flex",
      alignItems: "center",
      height: "auto",
      ".primaryRow": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      ".primaryRowData": {
        display: "flex",
        alignItems: "center",
      },
    },
    td: {
      padding: 10,
      paddingRight: 30,
      ".MuiBox-root": {
        textOverflow: "ellipsis",
      },
    },
    loaderContainer: {
      display: "none !important",
    },
    tableHead: {
      backgroundColor: theme?.palette?.tableColor?.header,
    },
    pagination: {
      color: theme?.palette?.textColor?.paginationText,
      font: "normal normal normal 14px/19px sans-serif !important",
      backgroundColor: `${theme.palette?.tableColor?.pagination} !important`,
      boxShadow: `${theme.palette?.tableColor?.shadow} 0px -2px 5px !important`,
    },
    ...style,
  };

  return (
    <Layout>
      <Table
        columnData={columnData || []}
        rawData={rawData || []}
        selectRows={selectedRows}
        disableColumnHiding={disableColumnHiding || false}
        disableRowSelection={disableRowSelection || true}
        pagination={!pagination}
        disablePagination={disablePagination}
        pageSizes={pageSize}
        currentPage={currentPage}
        onChangePageSize={onChangePageSize}
        onPageNumberChange={onPageNumberChange}
        pageCount={count || 10}
        disableColumnResize={true}
        disableSort={disableSort}
        manualSort={manualSort || false}
        onSort={tableSortValues}
        isLoading={isLoading || false}
        style={tableStyle}
      />
    </Layout>
  );
};

CustomReactTable.propTypes = {
  columnData: propTypes.array,
  rawData: propTypes.array,
  style: propTypes.object,
  count: propTypes.number,
  pageSize: propTypes.number,
  currentPage: propTypes.number,
  onPageNumberChange: propTypes.func,
  onChangePageSize: propTypes.func,
  disablePagination: propTypes.bool,
  disableColumnHiding: propTypes.bool,
  disableSort: propTypes.bool,
  disableRowSelection: propTypes.bool,
  selectedRows: propTypes.any,
  isLoading: propTypes.bool,
  maxHeight: propTypes.string,
  manualSort: propTypes.bool,
  pagination: propTypes.bool,
  disableLayout: propTypes.bool,
};
