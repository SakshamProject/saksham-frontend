export const getTableSchemas = (columns = []) => {
  let searchFields = [];
  let filterFields = [];
  let filterInitialValues = {};

  if (columns?.length) {
    columns?.forEach((column, index) => {
      searchFields.push(column?.accessor);
      filterFields.push({
        id: index,
        label: column?.Header,
        queryName: column?.accessor + "Drop",
        fieldName: column?.accessor,
      });
      filterInitialValues[column?.accessor] = "";
    });
  }

  return { searchFields, filterFields, filterInitialValues };
};

export const sortedValues = (column, value) => {
  const getObj = column?.find((item) => item?.accessor === value?.[0]?.id);

  let output = [];

  output.push({
    column: getObj?.accessor || "",
    order: value?.[0]?.desc ? "desc" : "asc",
  });

  return output;
};
