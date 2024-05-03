export const multiPartFormData = (workData, nullables = []) => {
  const form = new FormData();

  const appendFormData = (data, parentKey = "") => {
    Object.entries(data)?.forEach(([key, value]) => {
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof value === "object" && value !== null) {
        appendFormData(value, newKey);
      } else if (value !== "" || nullables?.includes(newKey)) {
        form.append(
          newKey,
          typeof value === "string"
            ? value?.trim()?.replace(/\s{2,}/g, " ")
            : value
        );
      }
    });
  };

  appendFormData(workData);

  return form;
};
