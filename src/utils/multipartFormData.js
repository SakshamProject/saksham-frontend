export const multiPartFormData = (workData, nullables = []) => {
  let form = new FormData();

  Object.keys(workData)
    .filter(
      (fill) => workData?.[fill] !== "" || nullables.some((key) => key === fill)
    )
    .map((item) =>
      form.append(
        item,
        typeof workData[item] === "string"
          ? workData[item].trim().replace(/\s{2,}/g, " ")
          : workData[item]
      )
    );
  return form;
};
