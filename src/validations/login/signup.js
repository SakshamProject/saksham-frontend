import { date, object, string } from "yup";
import {
  AADHAR_CARD_REGEX,
  EMAIL_REGEX,
  LOWER_CASE,
  NUMBER,
  UPPER_CASE,
} from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = object({
  firstName: string()
    .trim()
    .min(3, "Divyang First Name must be at least 3 characters long")
    .max(255, "Divyang First Name cannot have more than 255 characters")
    .required("Divyang First Name is required"),
  lastName: string()
    .trim()
    .min(3, "Divyang Last Name must be at least 3 characters long")
    .max(255, "Divyang Last Name cannot have more than 255 characters")
    .required("Divyang Last Name is required"),
  divyangId: string()
    .trim()
    .min(3, "Divyang ID must be at least 3 characters long")
    .max(255, "Divyang ID cannot have more than 255 characters")
    .required("Divyang ID is required"),
  dateOfBirth: date()
    .typeError("Invalid date")
    .min(minMaxAge({})?.max, "Date of birth should be less than 100 years old")
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
  aadharCardNumber: string()
    .trim()
    .required("Aadhar Number is required")
    .matches(AADHAR_CARD_REGEX, "Enter valid aadhar number")
    .test(
      "isZero",
      "Invalid Aadhar number",
      (value) => !(!!value && Number(value) === 0)
    )
    .test(
      "isNumeric",
      "Aadhar Number should contain only numbers",
      (value) => !(value && !/^\d+$/.test(value))
    )
    .length(12, "Aadhar Number should be 12 digits"),
  UDIDCardNumber: string().trim().required("UDID Number is required"),
  userName: string()
    .trim()
    .min(3, "Login User Name must be at least 3 characters long")
    .max(255, "Login User Name cannot have more than 255 characters")
    .required("Login User Name is required"),
  password: string()
    .trim()
    .required("Password is required")
    .matches(UPPER_CASE, "Password must contain at least one uppercase letter")
    .matches(LOWER_CASE, "Password must contain at least one lowercase letter")
    .matches(NUMBER, "Password must contain at least one number")
    .min(7, "Password must be at least 7 characters long")
    .max(24, "Password cannot have more than 24 characters"),
  confirmPassword: string()
    .trim()
    .required("Confirm password is required")
    .test(
      "isMatch",
      "Confirm password should be same",
      (value, context) => value === context?.parent?.password
    ),
});
