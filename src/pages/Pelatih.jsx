import React, {useEffect} from 'react'
import Layout from './Layout'
import Pelatihlist from '../component/Pelatihlist'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Pelatih = () => {
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
   if (user && user.role !== "Admin") {
     navigate("/dashboard");
   }
 }, [isError, user, navigate]);
  return (
    <Layout>
        <Pelatihlist/>
    </Layout>
  )
}

export default Pelatih
