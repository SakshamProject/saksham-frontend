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
  bloodGroup: string()
    .trim()
    .min(3, "Blood Group must be at least 3 characters long")
    .max(255, "Blood Group cannot have more than 255 characters")
    .required("Blood Group is required"),
  dateOfBirth: date()
    .typeError("Invalid date")
    .min(minMaxAge().max, "Date of birth should be less than 100 years old")
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
      "isNumeric",
      "Mobile Number should contain only numbers",
      (value) => !(value && !/^\d+$/.test(value))
    )
    .length(10, "Mobile Number should be 10 digits")
    .test(
      "isZero",
      "Invalid mobile number",
      (value) => !(!!value && Number(value) === 0)
    ),
  fatherName: string()
    .trim()
    .min(3, "Father Name must be at least 3 characters long")
    .max(255, "Father Name cannot have more than 255 characters")
    .required("Father Name is required"),
  motherName: string()
    .trim()
    .min(3, "Mother Name must be at least 3 characters long")
    .max(255, "Mother Name cannot have more than 255 characters")
    .required("Mother Name is required"),
  isMarried: string().nullable(),
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
  qualification: string().required("Educational Qualification is required"),
  eductionQualification: string().required(
    "Educational Qualification Sub Type is required"
  ),
  religion: string()
    .trim()
    .min(3, "Religion must be at least 3 characters long")
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
  password: string()
    .trim()
    .required("Password is required")
    .matches(UPPER_CASE, "Password must contain at least one uppercase letter")
    .matches(LOWER_CASE, "Password must contain at least one lowercase letter")
    .matches(NUMBER, "Password must contain at least one number")
    .matches(
      SPECIAL_CHARACTER,
      "Password must contain at least one special character"
    )
    .min(6, "Password must be at least 6 characters long")
    .max(25, "Password cannot have more than 25 characters"),
  confirmPassword: string()
    .trim()
    .required("Confirm password is required")
    .test(
      "confirmPassword",
      "Confirm password should be same",
      (value, context) => value === context?.parent?.password
    ),
});
