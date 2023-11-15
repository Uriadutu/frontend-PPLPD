import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Welcome = () => { 
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();


  return (
    <div>
      <div className="is-flex is-justify-content-space-between mb-5">
        <div className="">
          <h1 className="title">Dashboard</h1>
          <h2 className="subtitle">Selamat datang di SI Atlet PPLPD</h2>
        </div>

        {user && user.role === "Atlet" && (
          <div
            class="media card p-1"
            style={{
              border: "1px solid #666",
            }}
          >
            <div class="media-left">
              <img
                className="image is-64x64 is-rounded"
                src={user && user.Gambar && user.Gambar.url}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "1px solid #666",
                }}
              />
            </div>
            <div class="media-content">
              <p class="title is-4">{user.nama}</p>
              <p class="subtitle is-6">{user.email}</p>
            </div>
          </div>
        )}
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            {/* <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-primary">
                <p className="title">Vertical...</p>
                <p className="subtitle">Top tile</p>
              </article>
              <article className="tile is-child notification is-warning">
                <p className="title">...tiles</p>
                <p className="subtitle">Bottom tile</p>
              </article>
            </div> */}
            <div className="tile is-parent">
              <article className="tile is-child notification">
                <p className="title">Middle tile</p>
                <p className="subtitle">With an image</p>
                <figure className="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png" />
                </figure>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
              <p className="title">Wide tile</p>
              <p className="subtitle">Aligned with the right tile</p>
              <div className="content"></div>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification berita">
            <div className="content">
              <p className="title">Berita</p>
              <div className="content">

              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
