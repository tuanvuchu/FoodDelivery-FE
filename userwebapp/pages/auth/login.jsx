import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../schema/login";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.status === 201) {
        const data = {
          access_token: json.access_token,
          user: json.user,
        };
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Đăng nhập thành công", {
          position: "bottom-left",
          theme: "colored",
        });
        router.back();
      } else {
        toast.error("Có gì đó không ổn", {
          position: "bottom-left",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Địa chỉ email",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Mật khẩu",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Đăng nhập</Title>
        <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary" type="submit">
            ĐĂNG NHẬP
          </button>

          <Link href="/auth/register">
            <span className="text-sm underline cursor-pointer text-secondary">
              Bạn chưa có tài khoản?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
