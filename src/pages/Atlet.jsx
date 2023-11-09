import React, {useEffect} from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import AnakLayout from './AnakLayout';
import ListAtlet from '../component/Atlet/ListAtlet';

const Atlet = () => {
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
    <Layout>
        <ListAtlet/>
    </Layout>
  )
}

export default Atlet
