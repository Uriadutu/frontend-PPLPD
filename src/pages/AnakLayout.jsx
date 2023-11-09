import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AnakLayout = ({children}) => {
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
    <React.Fragment>
      <div class="tabs">
        <ul>
          <li class="is-active">
            <a>Pictures</a>
          </li>
          <li>
            <a>Music</a>
          </li>
          <li>
            <a>Videos</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
        </ul>
      </div>
      <div className="columns mt-6 p-3" style={{ minHeight: "100vh" }}>
        <div className="">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AnakLayout;
