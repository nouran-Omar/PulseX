import * as Yup from "yup";

export const createPatientValidationSchema = Yup.object({
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
  gender: Yup.string().required("Gender is required"),
});

export const editPatientValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
  password: Yup.string().min(8, "At least 8 characters"),
  gender: Yup.string().required("Gender is required"),
});
