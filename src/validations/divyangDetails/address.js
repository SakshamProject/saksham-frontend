import { object, string } from "yup";
import { CODES, PINCODE_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  doorNumber: string()
    .trim()
    .max(255, "Door Number cannot have more than 255 characters")
    .required("Door Number is required"),
  flatNumber: string()
    .trim()
    .max(255, "Flat Number cannot have more than 255 characters")
    .nullable(),
  streetName: string()
    .trim()
    .min(3, "Street Name must be at least 3 characters long")
    .max(255, "Street Name cannot have more than 255 characters")
    .required("Street Name is required"),
  nagarName: string()
    .trim()
    .min(3, "Nagar Name must be at least 3 characters long")
    .max(255, "Nagar Name cannot have more than 255 characters")
    .nullable(),
  stateId: string().required("State is required"),
  districtId: string().required("District is required"),
  isRural: string().nullable(),
  villageName: string()
    .trim()
    .nullable()
    .test(
      "villageName",
      "Village Name is required",
      (value, context) => !(context.parent?.isRural !== CODES?.URBAN && !value)
    )
    .min(3, "Village Name must be at least 3 characters long")
    .max(255, "Village Name cannot have more than 255 characters"),
  panchayatUnionId: string()
    .trim()
    .nullable()
    .test(
      "panchayatUnionId",
      "Panchayat Union is required",
      (value, context) => !(context.parent?.isRural !== CODES?.URBAN && !value)
    ),
  talukId: string().required("Taluk is required"),
  townPanchayatId: string()
    .trim()
    .nullable()
    .test(
      "townPanchayatId",
      "Town Panchayat is required",
      (value, context) => !(context.parent?.isRural !== CODES?.RURAL && !value)
    ),
  municipalityId: string()
    .trim()
    .nullable()
    .test(
      "municipalityId",
      "Municipality is required",
      (value, context) => !(context.parent?.isRural !== CODES?.RURAL && !value)
    ),
  corporationId: string()
    .trim()
    .nullable()
    .test(
      "corporationId",
      "Coporation is required",
      (value, context) => !(context.parent?.isRural !== CODES?.RURAL && !value)
    ),
  MLAConstituencyId: string().required("MLA Constituency is required"),
  MPConstituancyId: string().required("MP Constituency is required"),
  pincode: string()
    .trim()
    .required("Pincode is required")
    .matches(PINCODE_REGEX, "Enter Valid Email")
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0)
        return context.createError({ message: "Enter Valid Pincode" });
      return true;
    })
    .min(6, "Pincode must be 6 characters long"),
  doorNumberCommunication: string()
    .trim()
    .max(255, "Door Number cannot have more than 255 characters")
    .required("Door Number is required"),
  flatNumberCommunication: string()
    .trim()
    .max(255, "Flat Number cannot have more than 255 characters")
    .nullable(),
  streetNameCommunication: string()
    .trim()
    .min(3, "Street Name must be at least 3 characters long")
    .max(255, "Street Name cannot have more than 255 characters")
    .required("Street Name is required"),
  nagarNameCommunication: string()
    .trim()
    .min(3, "Nagar Name must be at least 3 characters long")
    .max(255, "Nagar Name cannot have more than 255 characters")
    .nullable(),
  stateIdCommunication: string().required("State is required"),
  districtIdCommunication: string().required("District is required"),
  isRuralCommunication: string().nullable(),
  villageNameCommunication: string()
    .trim()
    .nullable()
    .test(
      "villageNameCommunication",
      "Village Name is required",
      (value, context) =>
        !(context.parent?.isRuralCommunication !== CODES?.URBAN && !value)
    )
    .min(3, "Village Name must be at least 3 characters long")
    .max(255, "Village Name cannot have more than 255 characters"),
  panchayatUnionIdCommunication: string()
    .trim()
    .nullable()
    .test(
      "panchayatUnionIdCommunication",
      "Panchayat Union is required",
      (value, context) =>
        !(context.parent?.isRuralCommunication !== CODES?.URBAN && !value)
    ),
  talukIdCommunication: string().required("Taluk is required"),
  townPanchayatIdCommunication: string()
    .trim()
    .nullable()
    .test(
      "townPanchayatIdCommunication",
      "Town Panchayat is required",
      (value, context) =>
        !(context.parent?.isRuralCommunication !== CODES?.RURAL && !value)
    ),
  municipalityIdCommunication: string()
    .trim()
    .nullable()
    .test(
      "municipalityIdCommunication",
      "Municipality is required",
      (value, context) =>
        !(context.parent?.isRuralCommunication !== CODES?.RURAL && !value)
    ),
  corporationIdCommunication: string()
    .trim()
    .nullable()
    .test(
      "corporationIdCommunication",
      "Coporation is required",
      (value, context) =>
        !(context.parent?.isRuralCommunication !== CODES?.RURAL && !value)
    ),
  MLAConstituencyIdCommunication: string().required(
    "MLA Constituency is required"
  ),
  MPConstituancyIdCommunication: string().required(
    "MP Constituency is required"
  ),
  pincodeCommunication: string()
    .trim()
    .required("Pincode is required")
    .matches(PINCODE_REGEX, "Enter Valid Pincode")
    .test("isZero", (value, context) => {
      if (!!value && Number(value) === 0)
        return context.createError({ message: "Enter Valid Email" });
      return true;
    })
    .min(6, "Pincode must be 6 characters long"),
});
