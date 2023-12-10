import React, { useEffect } from "react";
import Layout from "../Layout";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatadiriPelatihOnly from "../../component/Pelatih/Datadiripelatih";
import Navbar from "../../component/Navbar";

const DataDiriPelatihPage = () => {
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
    <div>
        <Navbar/>
        <DatadiriPelatihOnly />
    </div>
  );
};

export default DataDiriPelatihPage;
