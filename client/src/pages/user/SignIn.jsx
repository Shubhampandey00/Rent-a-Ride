import { apiUrl } from "../../api";
import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";

import {
  loadingEnd,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(1, { message: "Password required" }),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { isLoading, isError } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      dispatch(signInStart());

const res = await fetch(apiUrl("/api/auth/signin"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
  });


      const data = await res.json();

      console.log("Login Response:", data);

      // Handle unsuccessful login
      if (!res.ok || data?.success === false) {
        dispatch(loadingEnd());

        dispatch(
          signInFailure({
            message:
              data?.message ||
              data?.error ||
              "Invalid email or password",
          })
        );

        return;
      }

      // Save tokens if provided by the backend
      if (data?.accessToken) {
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );
      }

      if (data?.refreshToken) {
        localStorage.setItem(
          "refreshToken",
          data.refreshToken
        );
      }

      // Admin login
      if (data?.isAdmin) {
        dispatch(signInSuccess(data));
        dispatch(loadingEnd());

        navigate("/adminDashboard");
        return;
      }

      // Normal user login
      if (data?.isUser) {
        dispatch(signInSuccess(data));
        dispatch(loadingEnd());

        navigate("/");
        return;
      }

      // Unexpected login response
      dispatch(loadingEnd());

      dispatch(
        signInFailure({
          message:
            "Invalid login response from server",
        })
      );
    } catch (error) {
      console.error(
        "Sign-in error:",
        error.message
      );

      dispatch(loadingEnd());

      dispatch(
        signInFailure({
          message:
            error.message ||
            "Unable to connect to the server",
        })
      );
    }
  };

  return (
    <div
      className="
        max-w-[340px]
        md:max-w-md
        min-h-[500px]
        mx-auto
        mt-[70px]
        md:mt-[80px]
        pb-10
        rounded-lg
        overflow-hidden
        shadow-2xl
        bg-white
        dark:bg-gray-900
        text-black
        dark:text-white
        transition-colors
        duration-300
      "
    >
      {/* HEADER */}
      <div
        className="
          green
          px-6
          py-2
          rounded-t-lg
          flex
          justify-between
          items-center
        "
      >
        <h1
          className={`
            ${styles.heading2}
            text-normal
          `}
        >
          Sign In
        </h1>

        <Link
          to="/"
          onClick={() => dispatch(loadingEnd())}
        >
          <div
            className="
              px-3
              font-bold
              hover:bg-green-300
              rounded-md
              shadow-inner
              cursor-pointer
            "
          >
            x
          </div>
        </Link>
      </div>

      {/* LOGIN FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 pt-10 px-5"
      >
        {/* EMAIL */}
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
            className="
              text-black
              bg-slate-100
              dark:bg-gray-800
              dark:text-white
              p-3
              rounded-md
              w-full
              outline-none
              border
              border-transparent
              focus:border-green-500
            "
          />

          {errors.email && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password")}
            className="
              text-black
              bg-slate-100
              dark:bg-gray-800
              dark:text-white
              p-3
              rounded-md
              w-full
              outline-none
              border
              border-transparent
              focus:border-green-500
            "
          />

          {errors.password && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className={`
            ${styles.button}
            disabled:bg-slate-500
            disabled:text-white
            disabled:cursor-not-allowed
          `}
        >
          {isLoading ? "Loading ..." : "Login"}
        </button>

        {/* BOTTOM TEXT */}
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <p
              className="
                text-[10px]
                border-r
                border-black
                dark:border-gray-500
                pr-2
              "
            >
              No account?{" "}

              <span className="text-blue-600">
                <Link to="/signup">
                  Sign Up
                </Link>
              </span>
            </p>

            <p className="text-[10px] pl-2 text-blue-600 cursor-pointer">
              Forgot password
            </p>
          </div>

          {/* ERROR MESSAGE */}
          <p className="text-[10px] text-red-600 ml-2">
            {isError
              ? isError.message || "Something went wrong"
              : ""}
          </p>
        </div>
      </form>

      {/* SOCIAL LOGIN */}
      <div>
        <h3
          className="
            text-center
            text-slate-700
            dark:text-slate-300
            pt-3
            pb-3
            text-[10px]
          "
        >
          OR
        </h3>

        <div className="flex justify-center items-center gap-3 pb-6">
          <span className="bg-green-300 w-20 h-[.1px]" />

          <span
            className="
              text-[10px]
              sm:text-[12px]
              text-slate-500
              dark:text-slate-400
            "
          >
            Continue with social login
          </span>

          <span className="bg-green-300 w-20 h-[.1px]" />
        </div>

        <OAuth />
      </div>
    </div>
  );
}

export default SignIn;
