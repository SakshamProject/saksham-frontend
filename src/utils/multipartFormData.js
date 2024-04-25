export const multiPartFormData = (workData, nullables = []) => {
  let form = new FormData();

  const appendFormData = (data, parentKey = "") => {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof value === "object" && value !== null) {
        appendFormData(value, newKey);
      } else {
        if (value !== "" || nullables.includes(newKey)) {
          form.append(
            newKey,
            typeof value === "string"
              ? value.trim().replace(/\s{2,}/g, " ")
              : value
          );
        }
      }
    });
  };

  appendFormData(workData);

  return form;
};
