import { object, string } from "yup";
import {
  // GENERALTYPE_INCLUDE,
  GENERAL_TYPES,
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
    (value, context) =>
      !(context?.parent?.typeMaster === GENERAL_TYPES?.DISTRICT && !value)
  ),
  chip: string()
    .max(255, "Sub type name cannot have more than 255 characters")
    .test(
      "isLength",
      "Sub type name must be at least 3 characters long",
      (value) => !(value?.length < 3)
    ),
  // .test("isRequired", "Sub type name is required", (value, context) => {
  //   if (
  //     context?.parent?.typeMaster === GENERAL_TYPES?.EDUCATIONAL_QUALIFICATION
  //   ) {
  //     return true;
  //   }
  //   return !(
  //     GENERALTYPE_INCLUDE.includes(context?.parent?.typeMaster) &&
  //     !value &&
  //     context?.parent?.chips?.length < 1
  //   );
  // }),
});
