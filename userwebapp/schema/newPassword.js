import * as Yup from "yup";

export const newPasswordSchema = Yup.object({
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
