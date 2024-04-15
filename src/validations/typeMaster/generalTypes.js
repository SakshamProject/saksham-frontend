import { object, string } from "yup";

import {
  DISABILITY_TYPE,
  DISTRICT,
  EDUCATIONAL_QUALIFICATION,
} from "../../constants/typeMasters/generalTypes";

export const validationSchema = object({
  name: string()
    .trim()
    .required("Type name is required")
    .min(3, "Type name must be at least 3 characters long")
    .max(255, "Type name cannot have more than 255 characters"),

  stateId: string().test(
    "isState",
    "State is required",
    (value, context) => !(context?.parent?.typeMaster === DISTRICT && !value)
  ),

  chip: string()
    .test("isChip", (value, context) => {
      if (value?.length < 3) {
        return context.createError({
          message: "Sub type name must be at least 3 characters long",
        });
      }
      if (
        [EDUCATIONAL_QUALIFICATION, DISABILITY_TYPE].includes(
          context?.parent?.typeMaster
        )
      ) {
        if (!value && context?.parent?.chips?.length < 1)
          return context.createError({ message: "Sub type name is required" });
      }
      return true;
    })
    .max(255, "Sub type name cannot have more than 255 characters"),
});
