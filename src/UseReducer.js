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

  if (action.type === "EDITDATA") {
    return { ...state, editdata: { ...state.editdata, ...action.payload } };
  }
  if (action.type === "UPDATE_EDIT") {
    const dataarray = state.formResponses.map((item) =>
      item.id === action.payload.id ? action.payload : item
    );
    console.log(dataarray);

    return { ...state, formResponses: dataarray };
  }

  if (action.type === "DETAILVIEW") {
    return {
      ...state,
      detailselect: state.Item.find((item) => item.id == action.payload),
    };
  }

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


  if(action.type==='FETCHASS'){
    return {...state}
  }
// if(action.type==='SET_ASSIGNMENTS'){
//     return { ...state, assignments: action.payload };

// }
  return state;
};

export default reducer;
