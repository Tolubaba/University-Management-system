import React from "react";
import { useContext, useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { level } from "./component/Data";
import { Semester } from "./component/Data";
import reducer from "./UseReducer";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  setDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "./component/firbaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const AppContext = createContext();
import { PeopleWithIds } from "./component/Data";
import { computerEngineeringcourses } from "./component/Data";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const AppProvider = ({ children }) => {
  const user = auth.currentUser;
  let assignmentsRef = collection(db, "assignments");
  let answersRef = collection(db, "answers");
  const [assignments, setAssignmentss] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [selected, setselected] = useState({});
  const [picklevel, setpicklevel] = useState("");
  const [picksemester, setpicksemester] = useState("");

  const [levelcheck, setlevelcheck] = useState({});

  const [selectedCourses, setSelectedCourses] = useState([]);

  const [showcourses, setshowcourses] = useState(false);

  const [mode, setmode] = useState(true);

  const [add, setadd] = useState([]);

  const [goLogin,setGoLogin]=useState(false)
  const maxUnitLimit = 24; // Define the maximum unit limit
  let checkbox;
  let filteredData;

  const [studentanswer, setstudentanswer] = useState();

  const [userInfo, setUserInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
    level: "",
    phonenumber: "",
    role: "",
    uid: "",
    username: "",
    matricnumber: "",
  });

  const [snapshot, snapshotLoading, snapshotError] = useDocument(
    doc(db, `users/${user ? user.uid : "x"}`)
  );

  useEffect(() => {
    if (snapshot) {
      setUserInfo({ ...userInfo, ...snapshot.data() });
      console.log("UserInfo: ", snapshot.data());
    }
  }, [snapshot]);

  const levelchange = (e) => {
    setpicklevel(e.target.value);

    console.log(picklevel);
  };

  const handlesemesterchange = (e) => {
    setpicksemester(e.target.value);
    console.log(picksemester);
  };

  const assignmentQuery = query(assignmentsRef);
  const [assignmentSnapshot, loading, error] = useCollection(assignmentQuery);
  const answersQuery = query(answersRef);
  const [answersSnapshotAns, loadingAns, errorAns] =
    useCollection(answersQuery);

  useEffect(() => {
    console.log("Loading", loading);
    if (assignmentSnapshot) {
      setAssignmentss(assignmentSnapshot.docs);
      localStorage.setItem(
        "assignmentsData",
        JSON.stringify(assignmentSnapshot.docs)
      );

      // dispatch({type:'SET_ASSIGNMENTS',payload:assignmentSnapshot.docs})
    }
  }, [assignmentSnapshot]);

  useEffect(() => {
    console.log("loadingAns", loadingAns);
    if (answersSnapshotAns) {
      console.log(answersSnapshotAns.docs);
      setAnswers(answersSnapshotAns.docs);
      localStorage.setItem(
        "answersData",
        JSON.stringify(answersSnapshotAns.docs)
      );
    }
  }, [answersSnapshotAns]);

  const initialstate = {
    assignmodal: false,
    selected: {},
    formResponses: [],
    studentsolution: {
      answertext: " ",
      file: "",
      comment: "",
    },

    editprofile: {
      firstname: "",
      lastname: "",
      email: "",
    },
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
      phonenumber: "",
      level: "Select",
      matricnumber: "",
      Regstatus:false
    },
    selectedFile: null,
    studentanswerfile: null,
    editprofileimage: null,
    nextId: 1,
    editingid: null,
    editdata: {},
    editanswer: {},
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

  const view = (id) => {
    // dispatch({ type: "VIEW", payload: id });
    // const select= assignments.find((item)=>item.id===id)
    // setselected(select);
  };

  const detailview = (id) => {
    dispatch({ type: "DETAILVIEW", payload: id });
  };

  const getselected = (item) => {
    dispatch({ type: "SELECTED", payload: item });
  };

  const answergetselected = (item) => {
    dispatch({ type: "ANSWER_SELECTED", payload: item });
  };

  const Editform = () => {
    dispatch({ type: "EDIT" });
  };

  const handleeditchange = (event) => {
    const { name, value } = event.target;
    const { editdata } = state;

    dispatch({ type: "EDITDATA", payload: { ...editdata, [name]: value } });
  };
  const handleditanswerchange = (event) => {
    const { name, value } = event.target;
    const { editanswer } = state;

    dispatch({
      type: "EDIT_ANSWER",
      payload: { ...editanswer, [name]: value },
    });
  };

  const editsubmit = (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(state.editdata, "tolu");
    console.log(typeof state.editdata.time);

    let assignmentsRef = collection(db, "assignments");

    updateDoc(doc(db, `assignments/${id}`), {
      title: state.editdata.title,
      description: state.editdata.description,
      date: state.editdata.date,
      time: state.editdata.time,
    });
  };

  // const handlemarkcomment=(e,id)=>{
  //   console.log(id,'comment id')

  //   e.preventDefault()
  //   updateDoc(doc,(db,`answers/${id}`),{
  //   mark:state.infoData.mark,
  //   })
  //   console.log(state.infoData.mark,'mark')

  // }

  const handlemarkcomment = (e, id) => {
    console.log(id, "comment id");

    e.preventDefault();

    updateDoc(doc(db, "answers", id), {
      mark: state.infoData.mark,
      Lecturercomment: state.infoData.comment,
    })
      .then(() => {
        console.log(state.infoData.mark, "mark updated successfully");
      })
      .catch((error) => {
        console.error("Error updating mark:", error.message);
      });
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
      Lecturer: user ? user.displayName : "",
      uid: user.uid ?? "x",
    };

    let assignmentsRef = collection(db, "assignments");
    addDoc(assignmentsRef, assignment)
      .then((snapshot) => {
        updateAssignment(snapshot, response, snapshot.id);
      })

      .catch((e) => {
        console.log(e.message);
      });
  };

  const updateAssignment = (snapshot, response, id) => {
    updateDoc(snapshot, { id: id }).then(() => {
      if (response.file) uploadlectureassignment(response.file, id);
    });
  };

  const editanswerwork = (e, id) => {
    e.preventDefault();
    console.log(id);
    const { studentsolution, studentanswerfile } = state;

    updateDoc(doc(db, `answers/${id}`), {
      answertext: state.editanswer.answertext,
      comment: state.editanswer.comment,
    }).then(() => {
      if (studentanswerfile) uploadAssignmentPDF(studentanswerfile, id);
      console.log(studentanswerfile);
    });

    console.log(state.editanswer);
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

  const checkMatricNumberExists = async (matricNumber) => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(
        usersRef,
        where("matricnumber", "==", matricNumber),
        where("role", "==", "Student")
      )
    );

    return !querySnapshot.empty;
  };
  const checkEmailExists = async (email) => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    return !querySnapshot.empty;
  };

  const verifysubmit = async (e) => {
    e.preventDefault();
    /* username: RegisterData.username,
  firstname: RegisterData.firstname,
  lastname: RegisterData.lastname,
  email: RegisterData.email,
  role: RegisterData.role,
  phonenumber: RegisterData.phonenumber,
  level: RegisterData.level,
  matricnumber: RegisterData.matricnumber,
  Regstatus:false */
    const { RegisterData } = state;

    console.log("The data being registered is");
    console.log(RegisterData);

    if (
      RegisterData.role === "Student" &&
      !/^([a-z]{3})(\/\d{2})(\/\d{4})$/.test(RegisterData.matricnumber)
    ) {
      alert("Invalid matric number"); // You can display an error message or handle it as needed
      return;
    }

    const matricNumberExists = await checkMatricNumberExists(
      RegisterData.matricnumber
    );
    if (matricNumberExists) {
      alert("Matric number already exists");
      return;
    }
    const matricEmailExists = await checkEmailExists(RegisterData.email);
    if (matricEmailExists) {
      alert("Email already exists");
      return;
    }

    if (RegisterData.password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    try {
      const response = await setDoc(doc(db, "admin", RegisterData.email), {
        ...RegisterData,
      });
      dispatch({ type: "REGSUBMIT" });
      return false
    } catch (error) {
      alert("There was an error uploading your data");
    }

   
   
  };

  const registersubmit = async (e) => {
    e.preventDefault();

    const { RegisterData } = state;
    if (
      RegisterData.role === "Student" &&
      !/^([a-z]{3})(\/\d{2})(\/\d{4})$/.test(RegisterData.matricnumber)
    ) {
      alert("Invalid matric number"); // You can display an error message or handle it as needed
      return;
    }

    const matricNumberExists = await checkMatricNumberExists(
      RegisterData.matricnumber
    );
    if (matricNumberExists) {
      alert("Matric number already exists");
      return;
    }

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
          phonenumber: RegisterData.phonenumber,
          level: RegisterData.level,
          matricnumber: RegisterData.matricnumber,
          Regstatus: RegisterData.Regstatus,
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

  const updateUserProfile = async (user, firebaseUser, url) => {
    await updateProfile(firebaseUser, {
      displayName: `${user.firstname} ${user.lastname}`,
      photoURL: url,
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
    const assignmentRef = doc(assignmentsRef, id);
    deleteDoc(assignmentRef)
      .then((it) => {
        console.log("Deleted: ", id);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const [IsChecked, setIsChecked] = useState(false);

  const handlecheckboxchange = () => {
    setIsChecked(!IsChecked);
  };

  if (IsChecked) {
    checkbox = (e) => {
      const value = e.target.value;

      if (e.target.checked) {
        if (!add.includes(value)) {
          setadd((prev) => [...prev, value]);
        }
      } else {
        // If the checkbox is unchecked, remove the value from the add array
        setadd((prev) => prev.filter((item) => item !== value));
      }
    };

    if (userInfo.level && !add.includes(userInfo.level)) {
      setadd((prev) => [...prev, userInfo.level]);
    }

    const integerAdd = add.map((value) => parseInt(value, 10));

    // Filter computer engineering data based on selected levels
    filteredData = computerEngineeringcourses.filter(
      (item) => integerAdd.includes(item.level) && item.semester == picksemester
    );
  } else {
    filteredData = computerEngineeringcourses.filter(
      (item) => item.level == userInfo.level && item.semester == picksemester
    );
  }

  const handlecousrechange = (course) => {
    const currentUnitSum = selectedCourses.reduce(
      (total, c) => total + c.units,
      0
    );

    if (
      selectedCourses.find(
        (selectedCourse) => selectedCourse.code === course.code
      )
    ) {
      // If the course is already selected, remove it
      setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code));
    } else if (currentUnitSum + course.units <= maxUnitLimit) {
      // If adding the course won't exceed the unit limit, add it
      setSelectedCourses([...selectedCourses, course]);
    } else {
      alert("Adding this course exceeds the maximum unit limit.");
    }
  };

  const regcousresubmit = (e) => {
    e.preventDefault();
    selectedCourses.length > 0 && setshowcourses(true);
    setpicklevel("");
    setpicksemester("");
    setIsChecked(false);
    if (selectedCourses.length < 0) {
      // Wrap the statements in a function or a lambda
      setshowcourses(false);
    }
    console.log(selectedCourses);

    const data = {
      id: user.uid ?? "x",
      uid: user.uid ?? "x",
      courses: [...selectedCourses],
    };
    let documentRef = doc(db, "registeredCourses", user.uid ?? "x");

    setDoc(documentRef, data).catch((e) => {
      console.log("Error: ", e.message);
    });
  };

  let registerRef = collection(db, "registeredCourses");
  let registerdocumentRef = doc(registerRef, user ? user.uid : "x");

  const [registersnapshot, regloading, regerror] =
    useDocument(registerdocumentRef);

  useEffect(() => {
    if (registersnapshot && registersnapshot.exists()) {
      console.log("Registered courses: ", registersnapshot.data());
      setSelectedCourses([...registersnapshot.data().courses]);
    }
  }, [registersnapshot]);

  const changemode = () => {
    setmode(false);
  };

  const handlestudentchange = (event) => {
    const { name, value } = event.target;
    const { studentsolution } = state;
    dispatch({
      type: "STUDENT_ANSWER",
      payload: { ...studentsolution, [name]: value },
    });
  };

  const handlestudentanswerfile = (event) => {
    const file = event.target.files[0];
    dispatch({ type: "STUDENT_FILE", payload: file });
  };

  const handlestudentsubmit = (e, id) => {
    e.preventDefault();
    const { studentsolution, studentanswerfile } = state;

    dispatch({ type: "ANSWER_EMPTY" });
    const answers = {
      assigmentid: id ?? "x",
      answertext: studentsolution.answertext,
      comment: studentsolution.comment,
      status: "",
      matricnumber: userInfo.matricnumber,
      studentid: user.uid ?? "x",
      name: user ? user.displayName : "",
      id: "",
    };

    const uploadData = async (user) => {
      try {
        // Create a new document in the "answers" collection
        const userCollectionRef = collection(db, "answers");

        // Add the document with the initial data
        const newDocRef = await addDoc(userCollectionRef, answers);

        // Now, update the document with the 'status' field
        await updateDoc(newDocRef, { status: "True", id: newDocRef.id }).then(
          () => {
            uploadAssignmentPDF(studentanswerfile, newDocRef.id);
          }
        );

        console.log("Data uploaded successfully.");
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    };

    if (
      state.studentsolution.answertext &&
      state.studentsolution.comment &&
      state.studentanswerfile
    ) {
      const response = { ...studentsolution, file: studentanswerfile };
      console.log(response);

      uploadData(answers);
      alert("submittted succesfully");
    } else {
      alert("please input  all the answers ");
    }
  };

  const uploadAssignmentPDF = (file, id) => {
    const answerRef = ref(storage, `answers/${id}`);
    uploadBytes(answerRef, file).then((snapshot) => {
      getAnswerDownloadUrl(answerRef, id);
    });
  };

  const uploadlectureassignment = (file, id) => {
    const lectureref = ref(storage, `assignments/${id}`);
    uploadBytes(lectureref, file).then((snapshot) => {
      getDownloadlink(lectureref, id);
    });
  };

  async function getDownloadlink(linkref, id) {
    await getDownloadURL(linkref).then((url) => {
      updateDoc(doc(db, `assignments/${id}`), {
        downloadurl: url,
      });
    });
  }

  async function getAnswerDownloadUrl(ref, id) {
    await getDownloadURL(ref).then((url) => {
      updateDoc(doc(db, `answers/${id}`), {
        url: url,
      });
    });
  }

  const editprofilechange = (event) => {
    const { name, value } = event.target;
    const { editprofile } = state;
    dispatch({
      type: "EDIT_PROFILE",
      payload: { ...editprofile, [name]: value },
    });
  };

  const editfilechange = (event) => {
    const file = event.target.files[0];
    dispatch({ type: "IMAGE_FILE", payload: file });
  };

  const editprofilesubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT_EMPTY" });

    const { editprofile, editprofileimage } = state;
    const response = { ...editprofile, file: editprofileimage };
    if (response.file) {
      uploadProfileImage(response.file, response);
    }
    updateDisplayName(response);
  };

  const updateDisplayName = (response) => {
    console.log(response.firstname, response.lastname);

    updateDoc(doc(db, `users/${user.uid}`), {
      firstname:
        response.firstname == "" ? userInfo.firstname : response.firstname,
      lastname: response.lastname == "" ? userInfo.lastname : response.lastname,
    }).then(() => {
      updateUserProfile(response, user);
      console.log(response.file);
    });
  };

  const uploadProfileImage = (file, response) => {
    const profileImageRef = ref(storage, `profileImages/${user.uid}`);
    uploadBytes(profileImageRef, file).then((snapshot) => {
      getDownloadUrl(snapshot, profileImageRef, response);
    });
  };

  async function getDownloadUrl(snapshot, ref, response) {
    await getDownloadURL(ref).then((url) => {
      updateDoc(doc(db, `users/${user.uid}`), {
        photoUrl: url,
      }).then(() => {
        updateProfileImageUrl(url, response);
      });
    });
  }

  const updateProfileImageUrl = (url, response) => {
    updateDoc(doc(db, `users/${user.uid}`), {
      photoUrl: url,
    }).then(() => {
      updateUserProfile(response, user, url);
    });
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
        answers,
        IsChecked,
        handlecheckboxchange,
        picklevel,
        levelchange,
        picksemester,
        handlesemesterchange,
        setpicklevel,
        setpicksemester,
        setIsChecked,
        userInfo,
        regcousresubmit,
        handlecousrechange,
        showcourses,
        selectedCourses,
        filteredData,
        mode,
        handlestudentchange,
        handlestudentanswerfile,
        handlestudentsubmit,
        editfilechange,
        editprofilesubmit,
        editprofilechange,
        studentanswer,
        answergetselected,
        handleditanswerchange,
        editanswerwork,
        checkbox,
        handlemarkcomment,
        verifysubmit,
        goLogin,
        setGoLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
