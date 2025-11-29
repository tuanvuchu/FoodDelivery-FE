import * as Yup from "yup";

const Schema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự")
    .required("Tên là bắt buộc"),
  email: Yup.string()
    .trim()
    .email("Vui lòng nhập một địa chỉ email hợp lệ")
    .required("Email là bắt buộc"),
  phone: Yup.string()
    .trim()
    .matches(
      /^0[0-9]{9}$/,
      "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0",
    )
    .required("Số điện thoại là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu không được vượt quá 50 ký tự")
    .required("Mật khẩu là bắt buộc"),

  currentPassword: Yup.string()
    .min(6, "Mật khẩu hiện tại phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu hiện tại không được vượt quá 50 ký tự")
    .required("Mật khẩu hiện tại là bắt buộc"),
  newPassword: Yup.string()
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu mới không được vượt quá 50 ký tự")
    .required("Mật khẩu mới là bắt buộc"),
  confirmPassword: Yup.string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không khớp"),
});

export const LoginSchema = Schema.pick(["email", "password"]);

export const RegisterSchema = Schema.pick(["fullName", "email", "password"]);

export const UpdateUserSchema = Schema.pick(["fullName", "email", "phone"]);

export const ChangePasswordSchema = Schema.pick([
  "currentPassword",
  "newPassword",
  "confirmPassword",
]);
