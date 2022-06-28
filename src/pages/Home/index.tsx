import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/UI";
import { auth } from "../../config/firebaseConfig";

const Home = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <p>Host</p>
      <Button appearance="primary" onClick={handleClickButton}>
        SignOut
      </Button>
      <Button appearance="primary" onClick={() => navigate("/todo")}>
        ToDo
      </Button>
    </>
  );
};

export default Home;
