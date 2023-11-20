import React, { useEffect } from "react";
import Navbar from "../../../component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import DataDiriAtlet from "../../../component/Atlet/AtletOnly/DataDiriAtlet";

const DataDiri = () => {
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
  }, [isError, user, navigate]);
  return (
    <div className="">
      <Navbar/>
      <DataDiriAtlet/>
    </div>
  );
};

export default DataDiri;
