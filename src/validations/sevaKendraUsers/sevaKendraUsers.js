import { date, object, string } from "yup";
import {
  CODES,
  EMAIL_REGEX,
  LOWER_CASE,
  NUMBER,
  SPECIAL_CHARACTER,
  UPPER_CASE,
} from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = (editId) =>
  object({
    stateId: string().required("State is required"),
    districtId: string().required("District is required"),
    sevaKendraId: string().trim().required("Seva Kendra Name is required"),
    userId: string()
      .trim()
      .min(3, "User Id must be at least 3 characters long")
      .max(255, "User Id cannot have more than 255 characters")
      .required("User Id is required"),
    firstName: string()
      .trim()
      .min(3, "First Name must be at least 3 characters long")
      .max(255, "First Name cannot have more than 255 characters")
      .required("First Name is required"),
    lastName: string()
      .trim()
      .min(3, "Last Name must be at least 3 characters long")
      .max(255, "Last Name cannot have more than 255 characters")
      .required("Last Name is required"),
    designationId: string().trim().required("Designation is required"),
    email: string()
      .trim()
      .matches(EMAIL_REGEX, "Enter Valid Personal Email Id")
      .required("Personal Email Id is required"),
    dateOfBirth: date()
      .typeError("Invalid date")
      .min(minMaxAge().max, "Date of birth should be less than 100 years old")
      .max(new Date(), "Date of birth should be in Past"),
    contactNumber: string()
      .trim()
      .required("Contact Number is required")
      .test(
        "isZero",
        "Invalid Contact number",
        (value) => !(!!value && Number(value) === 0)
      )
      .test(
        "isNumeric",
        "Contact Number should contain only numbers",
        (value) => !(value && !/^\d+$/.test(value))
      )
      .length(10, "Contact Number should be 10 digits"),
    whatsAppNumber: string()
      .trim()
      .test(
        "isZero",
        "Invalid Contact number",
        (value) => !(!!value && Number(value) === 0)
      )
      .test(
        "isNumeric",
        "Contact Number should contain only numbers",
        (value) => !(value && !/^\d+$/.test(value))
      )
      .length(10, "Contact Number should be 10 digits")
      .nullable(),
    loginId: string()
      .trim()
      .min(3, "Login Id must be at least 3 characters long")
      .max(255, "Login Id cannot have more than 255 characters")
      .required("Login Id is required"),
    password: string()
      .trim()
      .test("password", "Password is required", (value) =>
        editId ? true : !!value
      )
      .matches(
        UPPER_CASE,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        LOWER_CASE,
        "Password must contain at least one lowercase letter"
      )
      .matches(NUMBER, "Password must contain at least one number")
      .matches(
        SPECIAL_CHARACTER,
        "Password must contain at least one special character"
      )
      .min(6, "Password must be at least 6 characters long")
      .max(25, "Password cannot have more than 25 characters"),
    confirmPassword: string()
      .trim()
      .test(
        "confirmPassword",
        "Confirm password is required",
        (value, context) => {
          if (editId) return true;
          if (!value)
            return context.createError({
              message: "Confirm password is required",
            });
          if (!!value && value !== context?.parent?.password)
            return context.createError({
              message: "Confirm password should be same",
            });
          return !!editId || !!value;
        }
      ),
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
  });
