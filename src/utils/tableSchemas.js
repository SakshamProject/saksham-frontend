export const getTableSchemas = (columns = []) => {
  let filterFields = [];
  let filterInitialValues = {};

  if (columns?.length) {
    columns?.forEach((column, index) => {
      if (!!column?.filterAccessor) {
        filterFields.push({
          id: index,
          label: column?.Header,
          queryName: column?.filterAccessor + "Drop",
          fieldName: column?.filterAccessor,
        });
        filterInitialValues[column?.filterAccessor] = "";
      }
    });
  }
  return { filterFields, filterInitialValues };
};
