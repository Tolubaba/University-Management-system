/*  import React from 'react'
import { useState } from 'react';
import { useContext,useEffect,useReducer } from 'react'
import { createContext } from 'react'
import { useParams } from 'react-router-dom';


const AppContext=createContext();

 export const AppProvider = ({children}) => {

const [assignmodal,setassignmodal]=useState(false);

const openassmodal=()=>{
    setassignmodal(true)

    }

    const closeassmodal=()=>{
        setassignmodal(false)
    }

    const [nextId, setNextId] = useState(1); 


  
  const [formData, setformData] = useState({
    level: 'Select',
    semester: 'Select',
    course: 'Select',
  title: '',
      description:'',
      date:'',
      time:'',
      
      
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [formResponses, setFormResponses] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    const response = { id:nextId, ...formData, file: selectedFile };
    setFormResponses([...formResponses, response]);

    console.log(formResponses)

    setformData({
      level: 'Select',
    semester: 'Select',
    course: 'Select',
 title: '',
      description:'',
      date:'',
      time:'',
    });
    setSelectedFile(null);
    setNextId((prevId) => prevId + 1);


  

  };


  



  
         
      



  return (
    <AppContext.Provider value={{ openassmodal,closeassmodal, assignmodal,handleChange,handleFileChange,formData,formResponses,handleSubmit}}>
        {children}
      
    </AppContext.Provider>
  )



  }


 export const useGlobalcontext=()=>{
    return useContext(AppContext)
 }


  */