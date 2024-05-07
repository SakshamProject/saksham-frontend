import { object, string } from "yup";

export const validationSchema = (roleStatus) =>
  object({
    userName: string()
      .trim()
      .required("User name is required")
      .max(255, "User name must not exceed 255 characters"),
    contactNumber: string()
      .trim()
      .test(
        "isRequired",
        "Contact Number is required",
        (value) => !(roleStatus && !value)
      )
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
      .length(10, "Mobile Number should be 10 digits"),
    UDIDCardNumber: string()
      .trim()
      .test(
        "isRequired",
        "Contact Number is required",
        (value) => !(roleStatus && !value)
      )
      .required("UDID Number is required"),
  });
