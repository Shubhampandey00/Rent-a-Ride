import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "@firebase/auth";

import { app } from "../firebase";

import {
  loadingEnd,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());

      // Get Firebase Auth instance
      const auth = getAuth(app);

      // Google provider
      const provider = new GoogleAuthProvider();

      // Optional: always ask Google account selection
      provider.setCustomParameters({
        prompt: "select_account",
      });

      // Open Google login popup
      const result = await signInWithPopup(auth, provider);

      console.log("Google user:", result.user);

      // Send Google user information to your backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      console.log("Backend Google login response:", data);

      if (!res.ok) {
        dispatch(signInFailure(data));
        return;
      }

      // Save tokens
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // Normal user
      if (data?.isUser) {
        dispatch(signInSuccess(data));
        navigate("/");
        return;
      }

      // Admin/vendor or unexpected response
      dispatch(
        signInFailure({
          message: data?.message || "Google login failed",
        })
      );
    } catch (error) {
      console.error("Google login error:", error);

      dispatch(
        signInFailure({
          message: error?.message || "Could not login with Google",
        })
      );
    } finally {
      dispatch(loadingEnd());
    }
  };

  return (
    <div className="px-5">
      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleClick}
        className="
          flex
          w-full
          gap-3
          justify-center
          items-center
          border
          border-black
          dark:border-gray-500
          py-3
          rounded-md
          mb-4
          text-black
          dark:text-white
          bg-white
          dark:bg-gray-900
          hover:bg-gray-100
          dark:hover:bg-gray-800
          transition-colors
        "
      >
        <span className="icon-[devicon--google]"></span>

        <span>Continue with Google</span>
      </button>

      {/* Facebook */}
      <button
        type="button"
        className="
          flex
          w-full
          gap-3
          justify-center
          items-center
          border
          border-black
          dark:border-gray-500
          py-3
          rounded-md
          pl-4
          text-black
          dark:text-white
          bg-white
          dark:bg-gray-900
          hover:bg-gray-100
          dark:hover:bg-gray-800
          transition-colors
        "
      >
        <span className="icon-[logos--facebook]"></span>

        <span>Continue with Facebook</span>
      </button>
    </div>
  );
}

export default OAuth;