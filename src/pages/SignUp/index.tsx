import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AuthForm from "../../components/AuthForm";
import { auth } from "../../config/firebaseConfig";
// import { useTheme } from '../../hooks/useTheme';
import AuthFormParams from "../../interfaces/authForm.interface";
// import State from '../../interfaces/state.interface';
// import { clearError, signUp } from '../../redux/slices/userSlice';

const SignUp = () => {
  // const { error, uid } = useSelector((state: State) => state.user);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { theme } = useTheme();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
  }, [navigate]);

  // useEffect(() => {
  // 	if (error) {
  // 		toast.error(error);
  // 		dispatch(clearError());
  // 	}
  // }, [error, dispatch]);

  const handleSignUp = async ({ email, password }: AuthFormParams) => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/");
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
        // theme={theme === 'light' ? 'light' : 'dark'}
      />
    </>
  );
};

export default SignUp;
