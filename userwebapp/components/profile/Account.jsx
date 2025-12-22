import React, { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/get-by-id`,
        {
          params: { id },
        },
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const onSubmit = async (values, actions) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
        { id, ...values },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        },
      );
      if (res.status === 200) {
        (fetchUser(), toast.success("Cập nhật thành công"));
      }
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
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: user?.address || "",
      },
      onSubmit,
      validationSchema: profileSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Tên",
      value: values.name,
      errorMessage: errors.name,
      touched: touched.name,
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Số điện thoại",
      value: values.phone,
      errorMessage: errors.phone,
      touched: touched.phone,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Địa chỉ",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
  ];
  if (!user) return <p>Đang tải...</p>;

  return (
    <form
      className="lg:p-8 flex-1 lg:mt-0 mt-5"
      onSubmit={(e) => {
        console.log("submit clicked");
        handleSubmit(e);
      }}
    >
      <Title addClass="text-[40px]">Cài đặt tài khoản</Title>
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
