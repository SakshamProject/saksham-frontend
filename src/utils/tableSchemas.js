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

    return { searchFields, filterFields, filterInitialValues };
  }

  return { searchFields, filterFields, filterInitialValues };
};
