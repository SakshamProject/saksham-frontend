import { object, string, date } from "yup";

export const validationSchema = object({
  userName: string()
    .trim()
    .required("User name is required")
    .max(255, "User name cannot have more than 255 characters"),

  password: string().trim().required("Password is required"),
});

// export const forgetPasswordValidation = (data) =>
// 	object({
// 		...(data
// 			? {
// 					otp: string()
// 						.trim()
// 						.required("OTP is required")
// 						.max(6, "OTP must be 6 digits"),
// 				}
// 			: {
// 					emailId: string()
// 						.matches(EMAIL_REGEX, "Invalid Email")
// 						.required("Email is required")
// 						.max(255, "Email cannot have more than 255 characters"),
// 				}),
// 	});

// export const setPasswordValidation = object({
// 	password: string()
// 		.trim()
// 		.required("Password is required")
// 		.matches(UPPER_CASE, "Password must contain at least one uppercase letter")
// 		.matches(LOWER_CASE, "Password must contain at least one lowercase letter")
// 		.matches(NUMBER, "Password must contain at least one number")
// 		.matches(
// 			SPECIAL_CHARACTER,
// 			"Password must contain at least one special character",
// 		)
// 		.min(6, "Password must be at least 6 characters long")
// 		.max(25, "Password cannot have more than 25 characters"),

// 	confirmPassword: string()
// 		.trim()
// 		.required("Confirm password is required")
// 		.test(
// 			"confirmPassword",
// 			"Confirm password should be same",
// 			(value, context) => {
// 				if (!!value && value !== context?.parent?.password) return false;
// 				return true;
// 			},
// 		),
// });
