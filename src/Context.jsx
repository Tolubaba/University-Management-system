import React from "react";
import { useContext, useEffect, useReducer,useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import reducer from "./UseReducer";
import { setDoc, doc, addDoc, collection, updateDoc, deleteDoc, query } from "firebase/firestore";
import { auth, db } from "./component/firbaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const AppContext = createContext();
import { PeopleWithIds } from "./component/Data";



export const AppProvider = ({ children }) => {

  const user = auth.currentUser
let assignmentsRef = collection(db, "assignments")
  let documentRef = doc(assignmentsRef, user ? user.uid : "x")
  let coll = collection(documentRef, "assignment");
  const [assignments, setAssignmentss] = useState([])

  const [selected,setselected]=useState({})

  const assignmentQuery = query(coll)
  const [assignmentSnapshot, loading, error] = useCollection(assignmentQuery)


  useEffect(() => {
    if (user !== null) {
      documentRef = doc(assignmentsRef, user.uid)
      coll = collection(documentRef, "assignment");
      console.log("Snapshot", assignmentSnapshot)
    }
  }, [user])

  useEffect(() => {
    console.log("Loading", loading)
    if (assignmentSnapshot) {
      console.log("ASSIGNMENT", assignmentSnapshot)
      setAssignmentss(assignmentSnapshot.docs)
      localStorage.setItem('assignmentsData', JSON.stringify(assignmentSnapshot.docs));


      // dispatch({type:'SET_ASSIGNMENTS',payload:assignmentSnapshot.docs})
    }
  }, [assignmentSnapshot])


  

  const initialstate = {
    assignmodal: false,
    selected: {},
    formResponses: [],
    formData: {
      level: "Select",
      semester: "Select",
      course: "Select",
      title: "",
      description: "",
      date: "",
      time: "",
    },
    RegisterData: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      role: "Select",
    },
    selectedFile: null,
    nextId: 1,
    editingid: null,
    editdata: {},
    detailselect: {},
    Item: PeopleWithIds,
    infoData: {
      comment: "",
      mark: "",
    },
    LoginData: {
      email: "",
      password: "",
    },
    login: true,
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  const openassmodal = () => {
    console.log("tolu");
    dispatch({ type: "OPEN" });
  };

  const closeassmodal = () => {
    dispatch({ type: "CLOSE" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const { formData } = state;
    dispatch({ type: "FORMDATA", payload: { ...formData, [name]: value } });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    dispatch({ type: "FILE", payload: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { formData, selectedFile } = state;
    const response = { ...formData, file: selectedFile };
    dispatch({ type: "SUBMIT", payload: response });
    closeassmodal();

    const assignment = {
      level: formData.level,
      semester: formData.semester,
      course: formData.course,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
    };

    let assignmentsRef = collection(db, "assignments")
    let documentRef = doc(assignmentsRef, user ? user.uid : "x")
    let coll = collection(documentRef, "assignment");

    addDoc(coll, assignment)
      .then((snapshot) => {
        updateDoc(snapshot, { id: snapshot.id})
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const view = (id) => {
    // dispatch({ type: "VIEW", payload: id });
    // const select= assignments.find((item)=>item.id===id)
    // setselected(select);
console.log(id)

    
  };

  const detailview = (id) => {
    dispatch({ type: "DETAILVIEW", payload: id });
  };

  const getselected = (item) => {
    dispatch({ type: "SELECTED", payload: item });
  };

  const Editform = () => {
    dispatch({ type: "EDIT" });
  };

  const handleeditchange = (event) => {
    const { name, value } = event.target;
    const { editdata } = state;

    dispatch({ type: "EDITDATA", payload: { ...editdata, [name]: value } });
  };

  const updateitem = (item) => {
    dispatch({ type: "UPDATE_EDIT", payload: item });
  };

  const editsubmit = (e) => {
    e.preventDefault();
    updateitem(state.editdata);
  };

  const editid = (id) => {
    dispatch({ type: "ID", payload: id });
    console.log(id);
    console.log(state.formResponses);
  };

  const assinfochange = (event) => {
    const { name, value } = event.target;

    const { infoData } = state;

    dispatch({ type: "INFO_CHANGE", payload: { ...infoData, [name]: value } });
  };

  const logintrue = () => {
    dispatch({ type: "LOGINTRUE" });
  };

  const loginfalse = () => {
    dispatch({ type: "LOGINFALSE" });
  };

  const registerchange = (event) => {
    const { name, value } = event.target;
    const { RegisterData } = state;
    dispatch({ type: "REGDATA", payload: { ...RegisterData, [name]: value } });
  };

  const registersubmit = (e) => {
    e.preventDefault();

    const { RegisterData } = state;
    createUserWithEmailAndPassword(
      auth,
      RegisterData.email,
      RegisterData.password
    )
      .then((response) => {
        const user = {
          uid: response.user.uid,
          username: RegisterData.username,
          firstname: RegisterData.firstname,
          lastname: RegisterData.lastname,
          email: RegisterData.email,
          role: RegisterData.role,
        };
        uploadData(user, response.user);
      })
      .catch((err) => {
        alert(err.message);
      });

    dispatch({ type: "REGSUBMIT" });
    if (
      RegisterData.username &&
      RegisterData.firstname &&
      RegisterData.lastname &&
      RegisterData.email &&
      RegisterData.email &&
      RegisterData.role
    ) {
      dispatch({ type: "LOGINTRUE" });
    }
  };
  [];
  const uploadData = async (user, firebaseUser) => {
    await setDoc(doc(db, "users", user.uid), user)
      .then(() => {
        updateUserProfile(user, firebaseUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserProfile = async (user, firebaseUser) => {
    await updateProfile(firebaseUser, {
      displayName: `${user.firstname} ${user.lastname}`,
    })
      .then(() => {
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginchange = (e) => {
    const { name, value } = e.target;
    const { LoginData } = state;
    dispatch({ type: "LOGINDATA", payload: { ...LoginData, [name]: value } });
  };

  const loginsubmit = (e) => {
    e.preventDefault();
    const { LoginData } = state;
    signInWithEmailAndPassword(auth, LoginData.email, LoginData.password)
      .then((response) => {
        if (response) {
          localStorage.setItem("isLoggedIn", "true");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  

  const deleteass = (id) => {
    dispatch({ type: "DELETE", payload: id });

    const assignmentsRef = collection(db, "assignments");
    const documentRef = doc(assignmentsRef, user.uid);
    const coll = collection(documentRef, "assignment");
    const assignmentRef = doc(coll, id)
    deleteDoc(assignmentRef)
    .then((it) => {
      console.log("Deleted: ", id)
    }).catch((e) => {
      console.log(e.message)
    })
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openassmodal,
        closeassmodal,
        handleChange,
        handleFileChange,
        handleSubmit,
        view,
        editsubmit,
        editid,
        getselected,
        handleeditchange,
        detailview,
        assinfochange,
        loginfalse,
        logintrue,
        registerchange,
        registersubmit,
        loginchange,
        loginsubmit,
        user,
        deleteass,
        assignments,
        selected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
