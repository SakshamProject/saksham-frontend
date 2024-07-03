import { date, object, string } from "yup";
import { CODES, EMAIL_REGEX } from "../../constants/globalConstants";
import { formatDate } from "../../utils/common";

export const listValidationSchema = object({
  startDate: date()
    .typeError("Invalid date")
    .test("isStart", "Start date is required", (value) => !!value)
    .test(
      "isEqual",
      "Start date is not greater than or equal to end date",
      (value, context) =>
        !!value &&
        !!context?.parent?.endDate &&
        value < context?.parent?.endDate
    ),
  endDate: date()
    .typeError("Invalid date")
    .test("isEnd", "End date is required", (value) => !!value),
});

export const validationSchema = object({
  serviceTypeId: string().required("Service type is required"),
  serviceId: string().required("Service is required"),
  dateOfService: date()
    .typeError("Invalid Date")
    .required("Date of service is required")
    .test(
      "isPast",
      "Date of service is not less than today",
      (value) => !!value && value >= new Date().setHours(0, 0, 0, 0)
    ),
  dueDate: date()
    .typeError("Invalid Date")
    .required("Due date of service is required")
    .test(
      "isPast",
      "Due date is not less than today",
      (value) =>
        !!value &&
        formatDate({ date: value, format: "iso" }) >
          formatDate({ date: new Date(), format: "iso" })
    )
    .test(
      "isLess",
      "Due date is not less than Date of Service",
      (value, context) => context?.parent?.dateOfService < value
    ),

  stateId: string().test("isRequired", "State is required", (value, context) =>
    context?.parent?.isNonSevaKendraFollowUpRequired !== CODES?.NO
      ? true
      : !!value
  ),
  districtId: string().test(
    "isRequired",
    "District is required",
    (value, context) =>
      context?.parent?.isNonSevaKendraFollowUpRequired !== CODES?.NO
        ? true
        : !!value
  ),
  sevaKendraId: string().test(
    "isRequired",
    "Seva Kendra is required",
    (value, context) =>
      context?.parent?.isNonSevaKendraFollowUpRequired !== CODES?.NO
        ? true
        : !!value
  ),
  userId: string().test(
    "isRequired",
    "Assign user is required",
    (value, context) =>
      context?.parent?.isNonSevaKendraFollowUpRequired !== CODES?.NO
        ? true
        : !!value
  ),
  isNonSevaKendraFollowUpRequired: string(),
  nonSevaKendraFollowUp: object({
    name: string()
      .trim()
      .max(255, "Name cannot have more than 255 characters")
      .test("isRequired", "Contact person name is required", (value, context) =>
        context?.from?.[1]?.value.isNonSevaKendraFollowUpRequired !== CODES?.YES
          ? true
          : !!value
      ),
    mobileNumber: string()
      .trim()
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
      .length(10, "Mobile Number should be 10 digits")
      .test(
        "isRequired",
        "Contact person Mobile no is required",
        (value, context) =>
          context?.from?.[1]?.value.isNonSevaKendraFollowUpRequired !==
          CODES?.YES
            ? true
            : !!value
      ),
    email: string()
      .trim()
      .matches(EMAIL_REGEX, "Enter Valid Email")
      .max(255, "Email cannot have more than 255 characters")
      .test(
        "isRequired",
        "Contact person Email is required",
        (value, context) =>
          context?.from?.[1]?.value?.isNonSevaKendraFollowUpRequired !==
          CODES?.YES
            ? true
            : !!value
      ),
  }),
});

export const editValidationSchema = object({
  completedDate: date()
    .typeError("Invalid Date")
    .test("isRequired", "Completed date is required", (value, context) =>
      context?.parent?.isCompleted !== CODES?.YES ? true : !!value
    )
    .test("isFut", "Completed date should not greater than today", (value) =>
      value
        ? formatDate({ date: value, format: "iso" }) <
          formatDate({ date: new Date(), format: "iso" })
        : true
    )
    .nullable(),
  howTheyGotService: string()
    .trim()
    .test("isRequired", "This Field is required", (value, context) =>
      context?.parent?.isCompleted !== CODES?.YES ? true : !!value
    )
    .nullable(),
  reasonForNonCompletion: string()
    .trim()
    .max(255, "Reason cannot have more than 255 characters")
    .test("isRequired", "Reason is required", (value, context) =>
      context?.parent?.isCompleted !== CODES?.NO ? true : !!value
    )
    .nullable(),
  followUp: object({
    followUpdate: date()
      .typeError("Invalid Date")
      .test("isRequired", "Follow date is required", (value, context) =>
        context?.from?.[1]?.value?.isFollowUpRequired !== CODES?.YES
          ? true
          : !!value
      ),
    stateId: string().test(
      "isRequired",
      "State is required",
      (value, context) =>
        context?.from?.[1]?.value?.isFollowUpRequired !== CODES?.YES
          ? true
          : !!value
    ),
    districtId: string().test(
      "isRequired",
      "District is required",
      (value, context) =>
        context?.from?.[1]?.value?.isFollowUpRequired !== CODES?.YES
          ? true
          : !!value
    ),
    sevaKendraId: string().test(
      "isRequired",
      "Seva Kendra is required",
      (value, context) =>
        context?.from?.[1]?.value?.isFollowUpRequired !== CODES?.YES
          ? true
          : !!value
    ),
    userId: string().test(
      "isRequired",
      "User id is required",
      (value, context) =>
        context?.from?.[1]?.value?.isFollowUpRequired !== CODES?.YES
          ? true
          : !!value
    ),
  }),
});
