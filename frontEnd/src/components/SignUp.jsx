import signUp from "../assets/signUp1.png";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const onSubmit = async (values, actions) => {
    axios
      .post("http://localhost:3000/sign-up", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await new Promise((res) => setTimeout(res, 1000));
    actions.resetForm();
  };

  const {
    values,
    touched,
    isSubmitting,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

  const cookieCheck = cookie.get("jwtToken");
  if (cookieCheck) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center gap-20 py-8 lg:px-8 bg-slate-900">
      <img src={signUp} alt="signUP" className="hidden lg:flex" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[90%] md:w-[500px] backdrop-filter backdrop-blur-lg bg-slate-100 px-5 py-10 bg-opacity-5 border border-slate-500 rounded-xl"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-white font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`outline-none focus:border-cyan-500 border-2 border-slate-600 bg-slate-700 text-white py-1.5 px-2 rounded-lg ${
              errors.username && touched.username ? "border-red-500" : ""
            } `}
          />
          {errors.username && touched.username && (
            <p className="text-[13px] text-red-500">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@company.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`outline-none focus:border-cyan-500 bg-slate-700 text-white border-2 border-slate-600 py-1.5 px-2 rounded-lg ${
              errors.email && touched.email ? "border-red-500" : ""
            } `}
          />
          {errors.email && touched.email && (
            <p className="text-[13px] text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              placeholder="**********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`outline-none w-full focus:border-cyan-500 border-2 border-slate-600 bg-slate-700 text-white py-1.5 px-2 rounded-lg ${
                errors.password && touched.password ? "border-red-500" : ""
              } `}
            />
            <span
              className="text-slate-400 absolute right-[15px] top-[11px] text-xl"
              onClick={() => {
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                });
              }}
            >
              {showPassword.password ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </span>
          </div>
          {errors.password && touched.password && (
            <p className="text-[13px] text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-white font-semibold">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="**********"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`outline-none w-full focus:border-cyan-500 border-2 border-slate-600 text-white bg-slate-700 py-1.5 px-2 rounded-lg ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : ""
              } `}
            />
            <span
              className="text-slate-400 absolute right-[15px] top-[11px] text-xl"
              onClick={() => {
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword,
                });
              }}
            >
              {showPassword.confirmPassword ? (
                <IoEyeSharp />
              ) : (
                <IoEyeOffSharp />
              )}
            </span>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-[13px] text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-emerald-500 to-cyan-500 hover:bg-gradient-to-l font-semibold shadow-lg mt-4 rounded-md text-white py-2 disabled:${isSubmitting} `}
        >
          Sign Up
        </button>
        <p className="text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/sign-in">
            <span className="font-semibold cursor-pointer hover:underline">
              Log in
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
