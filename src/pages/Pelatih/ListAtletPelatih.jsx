import React, { useEffect } from 'react'
import Layout from "../Layout"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import AtletPelatih from '../../component/Pelatih/AtletPelatih';



const ListAtletPelatih = () => {
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
      <Layout>

        <AtletPelatih/>
      </Layout>
    </div>
  )
}

export default ListAtletPelatih
