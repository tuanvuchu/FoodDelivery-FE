import React, { useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { newPasswordSchema } from "../../schema/newPassword";
import axios from "axios";
import { useRouter } from "next/router";

export default function Password() {
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values, actions) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-password`,
        { id, password: values.password },
      );
      actions.resetForm();
      toast.success("Đổi mật khẩu thành công", {
        position: "bottom-left",
        theme: "colored",
      });
    } catch (error) {
      toast.error(error, {
        position: "bottom-left",
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Mật khẩu",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Nhập lại mật khẩu",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Mật khẩu</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button
        className="btn-primary mt-4"
        type="submit"
        disabled={isSubmitting}
      >
        Cập nhật
      </button>
    </form>
  );
}
