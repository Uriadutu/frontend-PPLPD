import React, {useEffect} from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import ListClub from '../component/ListClub';
const Club = () => {
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
    <div>
      <Layout>
        <ListClub/>
      </Layout>
    </div>
  )
}

export default Club
