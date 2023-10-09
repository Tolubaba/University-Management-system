import React from "react";
import Navbar from "./component/navbar";
import {
  Onlineexams,
  Classroutine,
  Attendance,
  MyAcocount,
  Marks,
} from "./component";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Editprofile from "./component/Editprofile";
import Dashboard from "./start";
import Attendancetake from "./component/Attendancetake";
import Attendancereport from "./component/Attendancereport";
import { styled } from "styled-components";
import Assignment from "./component/Assignment";
import Addnewassigment from "./component/Addnewassigment";
// import { useGlobalContext } from './Context'
import Asignmentpage from "./component/Assignmentpage";
// import { useGlobalcontext } from './UseContext'
import { BrowserRouter } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Detailmain from "./component/Detailmain";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./component/Login";
import Register from "./component/Register";
import Loginpage from "./component/Loginpage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./component/firbaseconfig";
import MainRoute from "./navigation/MainRoute";
import AuthRoute from "./navigation/AuthRoute";

const App = () => {
  const { assignmodal, user } = useGlobalContext();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <Wrapper>
      <BrowserRouter>
        <Navbar />
        {isLoggedIn ? <MainRoute /> : <AuthRoute />}
      </BrowserRouter>
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

export default App;
