import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import PerkembanganLatihan from "../../../component/Atlet/AtletOnly/PerkembanganLatihan";
import Navbar from "../../../component/Navbar";

const PerkembanganAtlet = () => {
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
    <div >
      <Navbar/>
        <PerkembanganLatihan/>
      
    </div>
  )
}

export default PerkembanganAtlet
