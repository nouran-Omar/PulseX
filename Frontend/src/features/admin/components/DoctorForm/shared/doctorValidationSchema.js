import * as Yup from "yup";

export const createDoctorValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  location: Yup.string().required("Location is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Consultation price is required"),
  gender: Yup.string().required("Gender is required"),
});

export const editDoctorValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
  password: Yup.string().min(8, "At least 8 characters"),
  location: Yup.string().required("Location is required"),
  price: Yup.number().positive("Must be positive").required("Required"),
  gender: Yup.string().required("Gender is required"),
});
