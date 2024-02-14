import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./Context";



const reducer = (state, action) => {
  if (action.type === "OPEN") {
    console.log("tolu");

    return { ...state, assignmodal: true };
  }

  if (action.type === "CLOSE") {
    return { ...state, assignmodal: false };
  }

  if (action.type === "FORMDATA") {
    return { ...state, formData: { ...state.formData, ...action.payload } };
  }

  if (action.type === "FILE") {
    return { ...state, selectedFile: action.payload };
  }
  if (action.type === "STUDENT_FILE") {
    return { ...state, studentanswerfile: action.payload };
  }
  if (action.type === "IMAGE_FILE") {
    return { ...state, editprofileimage: action.payload };
  }

  if (action.type === "SUBMIT") {
    const newResponse = {
      id: state.nextId,
      ...state.formData,
      file: state.selectedFile,
    };
    return {
      ...state,
      formResponses: [...state.formResponses, newResponse],
      formData: {
        level: "Select",
        semester: "Select",
        course: "Select",
        title: "",
        description: "",
        date: "",
        time: "",
      },
      selectedFile: null,
      nextId: state.nextId + 1,
    };
  }

//   if (action.type === "VIEW") {
//     console.log('this is action payload',action.payload)
//     return {
//       ...state,
//       selected: state.assignments.find((item) => item.id == action.payload),
//     };
//   }

  if (action.type === "ID") {
    return { ...state, editingid: action.payload };
  }

  if (action.type === "SELECTED") {
    return { ...state, editdata: { ...action.payload } };
  }

  if (action.type=='ANSWER_SELECTED'){
    return {...state,editanswer:{...action.payload}}
  }

  if (action.type === "EDITDATA") {
    return { ...state, editdata: { ...state.editdata, ...action.payload } };
  }
  
  if (action.type === "EDIT_ANSWER") {
    return { ...state, editanswer: { ...state.editanswer, ...action.payload } };
  }
  

  // if (action.type === "DETAILVIEW") {
  //   return {
  //     ...state,
  //     detailselect: state.Item.find((item) => item.id == action.payload),
  //   };
  // }

  if (action.type === "INFO_CHANGE") {
    return { ...state, infoData: { ...state.infoData, ...action.payload } };
  }

  if (action.type === "LOGINTRUE") {
    return { ...state, login: true };
  }

  if (action.type === "LOGINFALSE") {
    return { ...state, login: false };
  }

  if (action.type === "REGDATA") {
    return {
      ...state,
      RegisterData: { ...state.RegisterData, ...action.payload },
    };
  }

  if (action.type === "LOGINDATA") {
    return { ...state, LoginData: { ...state.LoginData, ...action.payload } };
  }

  if (action.type === "REGSUBMIT") {
    return {
      ...state,
      RegisterData: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        role: "Select",
        level:'Select',
        matricnumber:"",
        phonenumber: "",
        Regstatus: false
      },
    };
  }

  if (action.type === "DELETE") {
    return {
      ...state,
      formResponses: state.formResponses.filter(
        (item) => item.id !== action.payload
      ),
    };
  }


  if (action.type === "STUDENT_ANSWER") {
    return { ...state, studentsolution:{ ...state.studentsolution, ...action.payload } };

  }

  if (action.type === "EDIT_PROFILE") {
    return { ...state, editprofile:{ ...state.editprofile, ...action.payload } };
  }

  if(action.type ==='EDIT_EMPTY'){
    return { ...state, editprofile: {
      firstname: "",
      lastname: "",
      email: "",
    }, };

  }

  if(action.type==='ANSWER_EMPTY'){
    return {...state, studentsolution: {
      answertext: " ",
      file: "",
      comment: "",
    }}
  }
  return state;
};

export default reducer;
