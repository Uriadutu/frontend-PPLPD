import React, {useEffect} from 'react'
import Layout from './Layout'
import Caborlist from '../component/Caborlist'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Cabor = () => {
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
  }, [isError, navigate]);
useEffect(() => {
  if (isError) {
    navigate("/");
  }
  if (user && (user.role === "Atlet"|| user.role === "Pelatih")) {
    navigate("/dashboard");
  }
}, [isError, user, navigate]);
  return (
    <Layout>
        <Caborlist/>
    </Layout>
  )
}

export default Cabor
