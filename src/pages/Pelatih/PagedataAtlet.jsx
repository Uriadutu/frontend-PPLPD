import React, { useEffect } from "react";
import Layout from "../Layout";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import DataAtletPelatih from "../../component/Pelatih/DataAtletPelatih";

const PagedataAtlet = () => {
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
      <Navbar />
      <DataAtletPelatih />
    </div>
  );
};

export default PagedataAtlet;
