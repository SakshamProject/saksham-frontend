export const getSeedIdByName = (seeds = [], name = "") => {
  return seeds?.find((seed) => seed?.name === name)?.id || "";
};

export const getSeedNameById = (seeds = [], id = "") => {
  return seeds?.find((seed) => seed?.id === id)?.name || "";
};

export const getNeededValues = (values, initialValues) =>
  Object.keys(initialValues)?.reduce((formatted, key) => {
    return {
      ...formatted,
      [key]: values[key] || initialValues[key],
    };
  }, {});

export const getValidValues = (values, withArray, include = []) => {
  const entries = [...Object.keys(values), ...include];

  const validData = entries?.reduce((validated, key) => {
    if (Array?.isArray(values[key])) {
      return {
        ...validated,
        ...((values[key]?.length || withArray) && { [key]: values[key] }),
      };
    }
    if (typeof values[key] === "boolean") {
      return { ...validated, [key]: values[key] };
    }
    if (typeof values[key] === "string" && !!values[key]) {
      return { ...validated, [key]: values[key]?.trim()?.replace(/\s+/g, " ") };
    }
    if (typeof values[key] === "object" && values[key] !== null) {
      const nestedValidData = getValidValues(values[key], withArray, include);
      if (Object.keys(nestedValidData).length > 0) {
        return { ...validated, [key]: nestedValidData };
      }
    }
    return validated;
  }, {});

  return validData;
};

export const getDateTime = (timeValue = "") => {
  if (!timeValue) return;

  const currentDate = new Date();
  const [hours, minutes, seconds] = timeValue.split(":").map(Number);

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(seconds);

  return currentDate;
};

export const convertToDateObject = (dateString) => {
  if (!dateString) return;

  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
};

export const getLocalISOString = (date) => {
  if (!date) return;

  return date
    ?.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    })
    ?.replace(
      /(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/,
      (_, p1, p2, p3, p4, p5, p6) => {
        const hour = p4 === "24" ? "00" : p4;
        return `${p3}-${p1}-${p2}T${hour}:${p5}:${p6}Z`;
      },
    );
};

export const formatDate = ({ date, format, time, localDate, dateOnly }) => {
  dateOnly && date?.setHours(0, 0, 0, 0);
  const dateValue = time ? new Date(getDateTime(time)) : new Date(date);
  const d = localDate ? convertToDateObject(localDate) : dateValue;
  const month = (d?.getMonth() + 1)?.toString()?.padStart(2, "0");
  const day = d?.getDate()?.toString()?.padStart(2, "0");
  const year = d?.getFullYear()?.toString();
  const hours24 = d?.getHours();
  const hours12 = (hours24 % 12 || 12)?.toString()?.padStart(2, "0");
  const minutes = d?.getMinutes()?.toString()?.padStart(2, "0");
  const seconds = d?.getSeconds()?.toString()?.padStart(2, "0");
  const ampm = hours24 >= 12 ? "PM" : "AM";

  if (!(date || time || localDate)) return null;

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "HH:MM:SS":
      return `${hours24}:${minutes}:${seconds}`;
    case "hh:MM AM/PM":
      return `${hours12}:${minutes} ${ampm}`;
    case "dateTime":
      return `${year}-${month}-${day} ${hours24}:${minutes}:${seconds}`;
    case "iso":
      return d?.toISOString();
    default:
      return getLocalISOString(d);
  }
};

export const findNameById = (id, data) =>
  (data?.find((item) => item?.id === id)?.name || "")
    ?.toLowerCase()
    ?.replace(/^\w/, (c) => c?.toUpperCase());

export const getMinimumAgeDate = (value) => {
  const now = new Date();

  return new Date(
    now.getFullYear() - parseInt(value),
    now.getMonth(),
    now.getDate(),
  );
};

export const getAge = (dob) => {
  if (!dob) return;

  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age === 0 ? (age + 1)?.toString() : age?.toString();
};

export const minMaxAge = ({ maxYear = 100, minYear = 18 }) => {
  const minDate = new Date().setFullYear(new Date().getFullYear() - minYear);
  const maxDate = new Date().setFullYear(new Date().getFullYear() - maxYear);

  return { min: new Date(minDate), max: new Date(maxDate) };
};

export const getMinDate = ({ id, date }) => {
  const today = new Date();
  const editDate = new Date(date || new Date());

  console.log();

  if (id && editDate < today) {
    return date;
  }

  return today;
};
