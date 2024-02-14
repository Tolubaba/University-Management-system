import React from "react";
import Navbar from "../component/navbar";
import {
  Onlineexams,
  Classroutine,
  Attendance,
  MyAcocount,
  Marks,
  Assignment2,
} from "../component";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import Editprofile from "../component/Editprofile";
import Attendancetake from "../component/Attendancetake";
import Attendancereport from "../component/Attendancereport";
import { styled } from "styled-components";
import Assignment from "../component/Assignment";
import Addnewassigment from "../component/Addnewassigment";
// import { useGlobalContext } from './Context'
import Asignmentpage from "../component/Assignmentpage";
import Studentassigmentdetail from "../component/Studentassigmentdetail";
// import { useGlobalcontext } from './UseContext'
import { BrowserRouter } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Detailmain from "../component/Detailmain";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../component/Login";
import Register from "../component/Register";
import Loginpage from "../component/Loginpage";
import Registercourse from "../component/Registercourse";
import Attendance2 from "../component/Attendance2";
import Adminpage from "../component/Adminpage";


const MainRoute = () => {
  const { assignmodal, user,userInfo } = useGlobalContext();
  console.log(userInfo.role)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <Wrapper>
      {/* <BrowserRouter> */}
        {assignmodal && <Addnewassigment />}

        <article className="sidediv">
          <div className="sidebarapp">
            <Sidebar />
          </div>

          <div className="otherapp">
            <Routes>
              <Route
                path="/"
                element={<MyAcocount />}
              />

              <Route path="/attendance2" element={<Attendance2/>}/>
              <Route
                path="/attendance"
                element={<Attendance />}
              />
              <Route
                path="/marks"
                element={<Marks />}
              />
              <Route
                path="/attendancetake"
                element={<Attendancetake />}
              />
              <Route
                path="/attendancereport"
                element={<Attendancereport />}
              />
              <Route
                path="/editprofile"
                element={<Editprofile />}
              />
              
              <Route
                path="/assignmnet"
                element={<Assignment />}
              />
              <Route
                path="/assignmnet2"
                element={<Assignment2 />}
              />
              <Route
                path="/assignmentpage/:id"
                element={<Asignmentpage />}
              />
              <Route
                path="/detailmain/:id"
                element={<Detailmain />}
              />

              <Route path="/registercourse" element={<Registercourse/>}/>

              <Route path="/studentassignmentdetails/:id" element={<Studentassigmentdetail/>}/>
              <Route path="/adminpage" element={<Adminpage/>}/>

            </Routes>

          </div>
        </article>
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

export default MainRoute;
