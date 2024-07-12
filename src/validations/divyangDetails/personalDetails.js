import { date, object, string } from "yup";
import {
  CODES,
  EMAIL_REGEX,
  LOWER_CASE,
  NUMBER,
  UPPER_CASE,
} from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = (editId) =>
  object({
    firstName: string()
      .trim()
      .max(255, "Divyang First Name cannot have more than 255 characters")
      .required("Divyang First Name is required"),
    lastName: string()
      .trim()
      .max(255, "Divyang Last Name cannot have more than 255 characters")
      .required("Divyang Last Name is required"),
    divyangId: string()
      .trim()
      .max(255, "Divyang ID cannot have more than 255 characters")
      .required("Divyang ID is required"),
    bloodGroup: string().trim().required("Blood Group is required"),
    dateOfBirth: date()
      .typeError("Invalid date")
      .min(
        minMaxAge({})?.max,
        "Date of birth should be less than 100 years old"
      )
      .max(new Date(), "Date of birth should be in Past")
      .required("Date of birth is required"),
    mailId: string()
      .trim()
      .matches(EMAIL_REGEX, "Enter Valid Email")
      .max(255, "Email cannot have more than 255 characters")
      .required("Email is required"),
    mobileNumber: string()
      .trim()
      .required("Mobile Number is required")
      .test(
        "isZero",
        "Invalid mobile number",
        (value) => !(!!value && Number(value) === 0)
      )
      .test(
        "isNumeric",
        "Mobile Number should contain only numbers",
        (value) => !(value && !/^\d+$/.test(value))
      )
      .length(10, "Mobile Number should be 10 digits"),
    UDIDCardNumber: string()
      .trim()
      .required("UDID card number is required")
      .max(255, "UDID cannot have more than 255 characters"),
    fatherName: string()
      .trim()
      .max(255, "Father Name cannot have more than 255 characters")
      .required("Father Name is required"),
    motherName: string()
      .trim()
      .max(255, "Mother Name cannot have more than 255 characters")
      .required("Mother Name is required"),
    spouseName: string()
      .trim()
      .nullable()
      .test(
        "spouseName",
        "Spouse Name is required",
        (value, context) => !(context.parent?.isMarried !== CODES?.NO && !value)
      )
      .max(255, "Spouse Name cannot have more than 255 characters"),
    spouseNumber: string()
      .trim()
      .nullable()
      .test(
        "spouseNumber",
        "Spouse Number is required",
        (value, context) => !(context.parent?.isMarried !== CODES?.NO && !value)
      )
      .test(
        "isNumeric",
        "Spouse Number should contain only numbers",
        (value) => !(value && !/^\d+$/.test(value))
      )
      .length(10, "Spouse Number should be 10 digits")
      .test(
        "isZero",
        "Invalid Spouse number",
        (value) => !(!!value && Number(value) === 0)
      )
      .max(255, "Spouse Number cannot have more than 255 characters"),
    religion: string()
      .trim()
      .max(255, "Religion cannot have more than 255 characters")
      .required("Religion is required"),
    communityCategoryId: string().required("Community Category is required"),
    community: string()
      .trim()
      .nullable()
      .test(
        "community",
        "Community is required",
        (value, context) => !(context.parent?.communityCategoryId && !value)
      )
      .max(255, "Community cannot have more than 255 characters"),
    userName: string()
      .trim()
      .max(255, "Login User Name cannot have more than 255 characters")
      .required("Login User Name is required"),
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
      .min(7, "Password must be at least 7 characters long")
      .max(24, "Password cannot have more than 24 characters"),
    confirmPassword: string()
      .trim()
      .test(
        "confirmPassword",
        "Confirm password is required",
        (value, context) => {
          if (editId) return true;
          if (!value) {
            context.createError({
              message: "Confirm password is required",
            });
            return false;
          }
          if (!!value && value !== context?.parent?.password) {
            context.createError({
              message: "Confirm password should be same",
            });
            return false;
          }
          return !!editId || !!value;
        }
      ),
  });

export const eqValidationSchema = object({
  educationQualificationTypeId: string().required(
    "Educational Qualification is required"
  ),
});
