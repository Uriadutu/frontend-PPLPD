import React, {useEffect} from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import ProgramLatihan from '../component/ProgramLatihan';

const Program = () => {
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
        <ProgramLatihan/>
    </Layout>
  )
}

export default Program
