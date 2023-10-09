
import React from 'react'
import { useState } from 'react';
import { useContext,useEffect,useReducer } from 'react'
import { createContext } from 'react'
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import reducer from './UseReducer';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './component/firbaseconfig';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'

const AppContext=createContext()



import { PeopleWithIds } from './component/Data';


  export const AppProvider = ({children}) => {

    const [user] = useAuthState(auth)

    
    const initialstate={
        assignmodal:false,
        selected:{},
        formResponses: [],
         formData: {
    level: 'Select',
    semester: 'Select',
    course: 'Select',
    title: '',
    description: '',
    date: '',
    time: ''
  },
    RegisterData: {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    role: '',
  },
  selectedFile: null,
  nextId: 1,
  editingid:null,
  editdata:{},
  detailselect:{},
  Item:PeopleWithIds,
  infoData:{
    comment:'',
    mark:''
  },
  LoginData:{
    email:'',
    password:''

  },
login:true
  
};

const [state,dispatch]=useReducer(reducer,initialstate);

    const openassmodal=()=>{

      console.log('tolu')
        dispatch({ type:'OPEN'})
    
        }

        const closeassmodal=()=>{
            dispatch({type:'CLOSE'})
        }

        const handleChange = (event) => {
            const { name, value } = event.target;
            
            const {formData}=state
            dispatch({ type: 'FORMDATA', payload: { ...formData, [name]: value } });
          };

        const handleFileChange=(event)=>{
            const file=event.target.files[0]
            dispatch({type:'FILE',payload:file})

        }

        const handleSubmit = (event) => {
            event.preventDefault()
            const {formData,selectedFile }=state;
            const response = { ...formData, file: selectedFile };
            dispatch({ type:'SUBMIT', payload: response });
            closeassmodal()
          };
    
    const view =(id)=>{
      dispatch({type:'VIEW', payload:id})

      console.log(id)
  }

  const detailview=(id)=>{
    dispatch({type:'DETAILVIEW', payload:id})

  }

  const getselected=(item)=>{
    dispatch({type:'SELECTED', payload:item})

    console.log(item)
    }

    const Editform=()=>{
      dispatch({type:'EDIT'})
    }

    const handleeditchange=(event)=>{
    const {name,value}=event.target
    const {editdata}=state;

    dispatch({type:'EDITDATA',payload:{...editdata,[name]:value}})

    }

    
    const updateitem=(item)=>{
      dispatch({type:'UPDATE_EDIT',payload:item})

    }

    const editsubmit=(e)=>{
      e.preventDefault();
      updateitem(state.editdata)
    }

    const editid=(id)=>{
      dispatch({type:'ID',payload:id})
      console.log(id)
      console.log(state.formResponses)

    }

    const assinfochange=(event)=>{
      const {name,value}=event.target
      
      const {infoData}=state
      
  dispatch({type:'INFO_CHANGE',payload:{...infoData,[name]:value}})
    }

const assinfosubmit=()=>{

    }

    const logintrue =()=>{
      dispatch({type:'LOGINTRUE'})
    }

    const loginfalse=()=>{
      dispatch({type:'LOGINFALSE'})
    }



    const registerchange=(event)=>{
      const {name,value}=event.target
      const {RegisterData}=state
      dispatch({type:'REGDATA',payload:{...RegisterData,[name]:value}})

    }

    const registersubmit=(e)=>{
        e.preventDefault();

        const {RegisterData}=state
        console.log(RegisterData)
        createUserWithEmailAndPassword(auth, RegisterData.email,RegisterData.password ).then((response)=>{
          console.log(response.user)
          const user = {
            uid: response.user.uid,
            username: RegisterData.username,
            firstname: RegisterData.firstname,
            lastname: RegisterData.lastname,
            email: RegisterData.email,
            role: RegisterData.role,
          }
          uploadData(user, response.user)
        }).catch((err)=>{
          alert(err.message)
        }) 
    }

    const uploadData = async (user, firebaseUser) => {
      await setDoc(doc(db, "users", user.uid), user)
      .then(() => {
        updateUserProfile(user, firebaseUser)
      })
      .catch((err) => { console.log(err) })
    }
    
    const updateUserProfile = async (user, firebaseUser) => {
      await updateProfile(firebaseUser, {displayName: `${user.firstname} ${user.lastname}`})
      .then(() => {
        localStorage.setItem('isLoggedIn', 'true');
      }).catch((err) => {
        console.log(err)
      })
    }

    const loginchange=(e)=>{
      const {name,value}=e.target
      const {LoginData}=state
      dispatch({type:'LOGINDATA',payload:{...LoginData,[name]:value}})

  }

  const loginsubmit=(e)=>{
   e.preventDefault()
    const {LoginData}=state;
    signInWithEmailAndPassword(auth, LoginData.email,LoginData.password ).then((response)=>{
      if(response) { localStorage.setItem('isLoggedIn', 'true') }
    }).catch((err)=>{
      alert(err.message)
    }) 

     }

  return (
    <AppContext.Provider value={{...state,openassmodal,closeassmodal,handleChange,handleFileChange,handleSubmit,view,editsubmit,editid,getselected,handleeditchange,detailview, assinfochange,loginfalse,logintrue,registerchange,registersubmit,loginchange,loginsubmit,user}}>
        {children}

      
    </AppContext.Provider>
  )
}

 export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  

  

