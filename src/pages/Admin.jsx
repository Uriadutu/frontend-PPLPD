import React,{useEffect} from 'react'
import Layout from './Layout'
import Adminlist from '../component/Adminlist'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";


const Admin = () => {
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
    if (user && user.role !== "Admin"){
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
        <Adminlist/>
    </Layout>
  )
}

export default Admin
