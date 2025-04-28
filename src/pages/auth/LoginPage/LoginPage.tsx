/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { handleAsyncWithToast } from "../../../utils/handleAsyncWithToast";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyToken } from "../../../utils/verifyToken";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import MyButton from "../../../components/ui/MyButton/MyButton";

const LoginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password.length >= 6, {
    message: "Password must be at least 6 characters",
    path: ["password"],
  });

type LoginFormInputs = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const registrationData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await handleAsyncWithToast(
        async () =>
          loginUser({
            email: registrationData.email,
            password: registrationData.password,
          }),
        "Logging in..."
      );
      if (response?.data?.success) {
        const user = verifyToken(response?.data?.data?.accessToken);
        dispatch(
          setUser({
            user: user,
            token: response?.data?.data?.accessToken,
          })
        );
        toast.success(response?.data?.message);
        navigate("/");
        reset();
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-800 dark:text-white bg-gray-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-700 p-8 rounded-lg shadow">
        <h2 className="text-center text-3xl text-primary font-bold">
          Sign in here!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-0 text-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-0 text-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <MyButton
              label={isSubmitting ? "Login in..." : "Login"}
              isDisabled={isSubmitting}
              className="w-full"
              type="submit"
            />
            <div className="flex justify-center mt-3 items-center gap-1">
              New here?
              <Link to={"/register"} className="text-primary font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
