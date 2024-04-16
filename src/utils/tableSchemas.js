export const getTableSchemas = (columns = []) => {
  let filterFields = [];
  let filterInitialValues = {};

  if (columns?.length) {
    columns?.forEach((column, index) => {
      if (!!column?.filterAccessor) {
        filterFields.push({
          id: index,
          label: column?.Header,
          queryName: column?.accessor + "Drop",
          fieldName: column?.filterAccessor,
        });
        filterInitialValues[column?.accessor] = "";
      }
    });
  }
  return { filterFields, filterInitialValues };
};
