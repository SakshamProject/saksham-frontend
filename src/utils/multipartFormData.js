export const multiPartFormData = (workData, stringify = []) => {
  const form = new FormData();

  const appendFormData = (data, parentKey = "") => {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      if (
        typeof value === "object" &&
        !!value &&
        !stringify?.includes(newKey)
      ) {
        appendFormData(value, newKey);
      } else if (!!value) {
        console.log({ newKey, value });
        form.append(
          newKey,
          typeof value === "string"
            ? value.trim().replace(/\s{2,}/g, " ")
            : value
        );
      }
    });
  };

  appendFormData(workData);

  return form;
};
