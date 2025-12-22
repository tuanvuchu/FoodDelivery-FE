import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string()
    .required("Email is required.")
    .email("Email is invalid."),
});
