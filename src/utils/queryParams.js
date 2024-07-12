import queryString from "query-string";

export const parseQueryParams = (params, parseOptions) =>
  queryString.parse(params, { arrayFormat: "bracket", ...parseOptions });

export const createQueryParams = (params, arrayFormat) =>
  queryString.stringify(params, { arrayFormat: arrayFormat || "bracket" });
