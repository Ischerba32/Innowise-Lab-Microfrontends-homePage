import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AuthForm from "../../components/AuthForm";
import { auth } from "../../config/firebaseConfig";
import { useTheme } from "../../hooks/useTheme";
import AuthFormParams from "../../interfaces/authForm.interface";

const SignUp = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [error, setError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
  }, [navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  const handleSignUp = async ({ email, password }: AuthFormParams) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user && navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <AuthForm
        onSubmit={handleSignUp}
        formAction="SignUp"
        actionLink="/signin"
        actionTitle="SignIn"
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "light" ? "light" : "dark"}
      />
    </>
  );
};

export default SignUp;
