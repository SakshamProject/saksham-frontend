export const getSeedIdByName = (seeds = [], name = "") => {
  return seeds?.find((seed) => seed?.name === name)?.id || "";
};

export const getSeedNameById = (seeds = [], id = "") => {
  return seeds?.find((seed) => seed?.id === id)?.name || "";
};

export const getNeededValues = (values, initialValues) =>
  Object.keys(initialValues).reduce((formatted, key) => {
    return {
      ...formatted,
      [key]: values[key] ? values[key] : initialValues[key],
    };
  }, {});

export const getValidValues = (values, withArray, include = []) => {
  const entries = [...Object.keys(values), ...include] || [];

  const validData = entries.reduce((validated, key) => {
    if (Array.isArray(values[key])) {
      return {
        ...validated,
        ...((values[key]?.length || withArray) && { [key]: values[key] }),
      };
    }

    if (typeof values[key] === "boolean" || !!values[key]) {
      if (typeof values[key] === "string") {
        return { ...validated, [key]: values[key].trim().replace(/\s+/g, " ") };
      }
      return { ...validated, [key]: values[key] };
    }
    return validated;
  }, {});
  return validData;
};

export const getDateTime = (timeValue = "") => {
  const timeVal = timeValue || "";
  const currentDate = new Date();
  const [hours, minutes, seconds] = timeVal.split(":").map(Number);

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(seconds);

  if (!timeVal) return "";
  return currentDate;
};

export const convertToDateObject = (dateString) => {
  if (!dateString) return "";

  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
};

export const formatDate = ({ date, format, time, localDate }) => {
  const dateValue = time ? new Date(getDateTime(time)) : new Date(date);
  const d = localDate ? convertToDateObject(localDate) : dateValue;
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear().toString();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  if (!(date || time || localDate)) return "";

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD-MM-YYYY":
      return `${year}-${month}-${day}`;
    case "HH:MM:SS":
      return `${hours}:${minutes}:${seconds}`;
    case "dateTime":
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

export const findNameById = (id, data) =>
  (data?.find((item) => item?.id === id)?.name || "")
    ?.toLowerCase()
    ?.replace(/^\w/, (c) => c?.toUpperCase());
