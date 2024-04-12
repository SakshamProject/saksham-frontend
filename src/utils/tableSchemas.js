export const getTableSchemas = (columns = []) => {
  let filterFields = [];
  let filterInitialValues = {};

  if (columns?.length) {
    columns?.forEach((column, index) => {
      filterFields.push({
        id: index,
        label: column?.Header,
        queryName: column?.accessor,
        fieldName: column?.filterAccessor || column?.accessor,
      });
      filterInitialValues[column?.accessor] = "";
    });
  }
  return { filterFields, filterInitialValues };
};

export const sortedValues = (column, value) => {
  const getObj = column?.find((item) => item?.accessor === value?.[0]?.id);

  let output = [];

  output.push({
    orderByColumn: getObj?.accessor || "",
    sortOrder: value?.[0]?.desc ? "desc" : "asc",
  });

  return output;
};
