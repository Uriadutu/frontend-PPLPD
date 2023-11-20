import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Latihan from "../../component/Atlet/Perkembangan/Latihan";

const RecordLatihan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div className="has-background-grey-light" style={{ maxHeight: "100vh" }}>
      <Latihan />
    </div>
  );
};

export default RecordLatihan;
