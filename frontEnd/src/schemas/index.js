import * as yup from "yup";

const passwordRules =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// This regex enforces the following rules for the password:

// At least one uppercase letter ([A-Z])
// At least one lowercase letter ([a-z])
// At least one digit (\d)
// At least one special character from this set: @$!%*?&
// Minimum length of 8 characters

const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// This regex enforces the following rules:

// The email must start with alphanumeric characters or these special characters: . _ % + -
// An @ symbol is required
// A valid domain name (e.g., example.com) follows, allowing alphanumeric characters and hyphens (-)
// The domain must have a dot (.) followed by a valid top-level domain (e.g., .com, .org), with at least 2 characters

const usernameRules = /^[a-zA-Z0-9._-]{3,16}$/;
// This regex enforces the following rules:

// Only allows alphanumeric characters, periods (.), underscores (_), and hyphens (-)
// Length between 3 and 16 characters

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .matches(usernameRules, {
      message:
        "Username must be 3-16 characters and can include letters, numbers, and _ . -",
    })
    .required("Required"),
  email: yup
    .string()
    .matches(emailRules, { message: "Please enter a valid email address." })
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRules, { message: "Please enter a valid email address." })
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("Required"),
});
