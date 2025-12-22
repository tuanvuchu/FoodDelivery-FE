import * as Yup from "yup";

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Tên là bắt buộc.")
    .min(3, "Tên phải có ít nhất 3 ký tự."),
  phoneNumber: Yup.string()
    .required("Số điện thoại là bắt buộc.")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự."),
  email: Yup.string()
    .required("Email là bắt buộc.")
    .email("Email không hợp lệ."),
  persons: Yup.string().required("Lời nhắn là bắt buộc."),
});
