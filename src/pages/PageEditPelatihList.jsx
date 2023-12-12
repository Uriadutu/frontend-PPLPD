import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import ListAtlet from "../component/Atlet/ListAtlet";
import ListAtletEdit from "../component/Atlet/ListAtletEdit";
import ListPelatihEdit from "../component/Pelatih/ListPelatihEdit";

const PageEditPelatihList = () => {
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
      <ListPelatihEdit />
    </Layout>
  );
};

export default PageEditPelatihList;
