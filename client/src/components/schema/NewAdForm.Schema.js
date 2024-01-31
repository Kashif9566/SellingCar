import * as Yup from "yup";

export const validationSchemaForAd = Yup.object({
  city: Yup.string().required("City is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.string().required("Year is required"),
  exteriorColor: Yup.string().required("Color is required"),
  mileage: Yup.number()
    .required("Enter valid mileage (1-1000000)")
    .positive("Mileage must be a positive number")
    .integer("Mileage must be an integer")
    .min(1, "Mileage must be at least 1")
    .max(1000000, "Mileage cannot exceed 1,000,000"),
  price: Yup.number().required("Price is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^0?\d{10}$/, "Enter a valid mobile number"),

  secondaryNumber: Yup.string().matches(
    /^0?\d{10}$/,
    "Enter a valid mobile number"
  ),
});
