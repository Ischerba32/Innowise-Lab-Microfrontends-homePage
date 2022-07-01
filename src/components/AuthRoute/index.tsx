import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { auth } from "../../config/firebaseConfig";
import IUser from "../../interfaces/user.interface";
import { AuthContext } from "../../context/authContext";
// import State from '../../interfaces/state.interface';
// import { checkAuthSuccess } from '../../redux/slices/userSlice';
import AuthRouteProps from "./props";

const AuthRoute = ({ children }: AuthRouteProps) => {
  // const dispatch = useDispatch();
  // const { uid } = useSelector((state: State) => state.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ uid: "", email: "" });

  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser({
          uid: user.uid,
          email: user?.email,
        });
      } else {
        console.log("Unauthorized");
        setUser({
          uid: "",
          email: "",
        });
        navigate("/signin");
      }
    });
  }, [navigate]);

  // return <>{children}</>;
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthRoute;
