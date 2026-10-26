import { useState } from "react";
import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters required" })
    .max(50, { message: "Username is too long" }),

  email: z
    .string()
    .min(1, { message: "Email required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Minimum 6 characters required" }),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      console.log("Signup response:", data);

      if (!res.ok) {
        setError(
          data?.message ||
            data?.error ||
            "Unable to create account"
        );
        return;
      }

      // Signup successful
      setError("");

      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);

      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        pb-10
        max-w-lg
        mx-auto
        mt-16
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
        <h1 className={`${styles.heading2} text-[28px]`}>
          Sign Up
        </h1>

        <Link to="/">
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

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 pt-10 px-5"
      >
        {/* USERNAME */}
        <div>
          <input
            type="text"
            id="username"
            autoComplete="username"
            className="
              text-black
              bg-slate-100
              p-3
              rounded-md
              w-full
              outline-none
            "
            placeholder="Username"
            {...register("username")}
          />

          {errors.username && (
            <p className="text-red-500 text-[10px] pt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="
              text-black
              bg-slate-100
              p-3
              rounded-md
              w-full
              outline-none
            "
            placeholder="Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-[10px] pt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className="
              text-black
              bg-slate-100
              p-3
              rounded-md
              w-full
              outline-none
            "
            placeholder="Password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-[10px] pt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ERROR */}
        {isError && (
          <p className="text-red-600 text-xs text-center">
            {isError}
          </p>
        )}

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          className={`
            ${styles.button}
            disabled:bg-slate-500
            disabled:text-white
          `}
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Register"}
        </button>

        {/* SIGN IN */}
        <div className="flex justify-between">
          <p className="text-[10px]">
            Have an account?{" "}
            <span className="text-blue-600">
              <Link to="/signin">Sign in</Link>
            </span>
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
              dark:text-slate-300
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

export default SignUp;