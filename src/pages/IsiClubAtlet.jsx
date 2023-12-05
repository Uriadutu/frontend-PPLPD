import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IsiClub from "../component/IsiClub";
import { getMe } from "../features/authSlice";
import Navbar from "../component/Navbar";
const IsiClubAtlet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role === "Atlet") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <div className="" style={{ minHeight: "100vh", background : "#e7e7e7" }}>
      <IsiClub />
    </div>
  );
}

export default IsiClubAtlet;
