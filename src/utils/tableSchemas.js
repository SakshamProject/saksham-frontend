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
