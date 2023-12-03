import React, { useEffect } from 'react'
import Layout from '../Layout'
import ForumAtlet from '../../component/forum-cabor/ForumAtlet'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';

const ForumCabor = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  {user && user.role !== "Admin" && navigate(`/forum/cabor/${user.id_cabor}`)}
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
        <ForumAtlet />      
    </Layout>
  )
}

export default ForumCabor
