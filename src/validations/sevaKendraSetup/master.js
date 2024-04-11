import { date, object, string } from "yup";
import { EMAIL_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  name: string()
    .trim()
    .min(3, "Seva Kendra Name must be at least 3 characters long")
    .required("Seva Kendra Name is required")
    .max(255, "Name cannot have more than 255 characters"),
  stateId: string().required("State is required"),
  districtId: string().required("District is required"),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Address cannot have more than 255 characters"),
  landlineNumber: string()
    .trim()
    .required("Mobile number is required")
    .length(10, "Mobile number should be 10 digits")
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0)
        return context.createError({ message: "Invalid mobile number" });
      return true;
    }),
  mobileNo: string()
    .trim()
    .required("Mobile number is required")
    .length(10, "Mobile number should be 10 digits")
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0)
        return context.createError({ message: "Invalid mobile number" });
      return true;
    }),
  startDate: date()
    .required("Seva Kendra Start Date is required")
    .typeError("Invalid date"),
  contactPersonName: string()
    .trim()
    .min(3, "Contact Person Name must be at least 3 characters long")
    .required("Contact Person Name is required")
    .max(255, "Contact Person Name cannot have more than 255 characters"),
  emailId: string()
    .trim()
    .matches(EMAIL_REGEX, "Invalid Email")
    .required("Email is required")
    .max(255, "Email cannot have more than 255 characters"),
});
