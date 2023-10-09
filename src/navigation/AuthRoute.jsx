import React from "react";
import Navbar from "../component/navbar";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Loginpage from "../component/Loginpage";

const AuthRoute = () => {
  const { assignmodal, user } = useGlobalContext();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <Wrapper>
      {/* <BrowserRouter> */}
        <div className="otherapp">
          <Routes>
            <Route
              path="/"
              element={<Loginpage />}
            />
          </Routes>
        </div>
      {/* </BrowserRouter> */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .sidediv {
    display: flex;
    align-items: flex-start;
    background-color: whitesmoke;
    padding: 30px;
    gap: 30px;
    min-height: 100vh;

    .sidebarapp {
      width: 25%;
      background-color: white;
      border-radius: 8px;
      padding-top: 30px;
      padding-bottom: 30px;
    }

    .otherapp {
      width: 75%;
      background-color: white;
      border-radius: 8px;
      padding: 30px 30px;
    }
  }
`;

export default AuthRoute;
