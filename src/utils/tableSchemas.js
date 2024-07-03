export const getTableSchemas = (columns = []) => {
  const filterFields = [];
  const filterInitialValues = {};

  if (columns?.length) {
    columns?.forEach((column, index) => {
      if (column?.filterAccessor && !column?.skipFilter) {
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
