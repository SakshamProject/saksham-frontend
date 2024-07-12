import { object, string } from "yup";
import { CODES } from "../../constants/globalConstants";

export const validationSchema = (role) =>
  object({
    userName: string()
      .trim()
      .required("User name is required")
      .max(255, "User name must not exceed 255 characters"),
    ...(role === CODES?.SEVA_KENDRA
      ? {
          contactNumber: string()
            .trim()
            .required("Contact Number is required")
            .test(
              "isZero",
              "Invalid contact number",
              (value) => !(!!value && Number(value) === 0)
            )
            .test(
              "isNumeric",
              "Contact Number should contain only numbers",
              (value) => !(value && !/^\d+$/.test(value))
            )
            .length(10, "Contact Number should be 10 digits"),
        }
      : {
          UDIDCardNumber: string().trim().required("UDID Number is required"),
        }),
  });
