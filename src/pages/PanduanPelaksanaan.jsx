import React, { useEffect } from 'react';
import Layout from "./Layout";
import Panduan from '../component/Panduan';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const PanduanPelaksanaan = () => {

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
    <Layout>
        <Panduan/>
    </Layout>
  )
}

export default PanduanPelaksanaan
