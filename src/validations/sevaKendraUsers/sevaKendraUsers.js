import { object, string } from "yup";
import { CODES } from "../../constants/globalConstants";

export const validationSchema = (editId) =>
  object({
    //   name: string()
    //     .trim()
    //     .min(3, "Seva Kendra Name must be at least 3 characters long")
    //     .required("Seva Kendra Name is required"),
    //   stateId: string().required("State is required"),
    //   districtId: string().required("District is required"),
    auditLog: object({
      status: string().nullable(),
      description: string()
        .trim()
        .nullable()
        .test(
          "deactivationReason",
          "Deactivation reason is required",
          (value, context) =>
            !(context.parent?.status !== CODES.ACTIVE && !!editId && !value)
        )
        .max(255, "Deactivation reason cannot have more than 255 characters"),
    }),
  });
